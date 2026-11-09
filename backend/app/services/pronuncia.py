import base64
import json

import httpx
from fastapi import HTTPException, status

from app.config import settings
from app.schemas.avaliacao import AvaliacaoPalavra, ResultadoFrase

URL_AZURE = "https://{regiao}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1"


async def avaliar_pronuncia(audio: bytes, frase_id: int, texto: str) -> ResultadoFrase:
    if not settings.azure_speech_key:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, "A avaliação de pronúncia não está configurada.")

    parametros = {
        "ReferenceText": texto,
        "GradingSystem": "HundredMark",
        "Granularity": "Word",
        "Dimension": "Comprehensive",
        "EnableMiscue": "True",
    }
    cabecalhos = {
        "Ocp-Apim-Subscription-Key": settings.azure_speech_key,
        "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
        "Accept": "application/json",
        "Pronunciation-Assessment": base64.b64encode(json.dumps(parametros).encode()).decode(),
    }

    try:
        async with httpx.AsyncClient(timeout=30) as cliente:
            resposta = await cliente.post(
                URL_AZURE.format(regiao=settings.azure_speech_region),
                params={"language": "en-US", "format": "detailed"},
                headers=cabecalhos,
                content=audio,
            )
        resposta.raise_for_status()
    except httpx.HTTPError:
        raise HTTPException(status.HTTP_502_BAD_GATEWAY, "Não foi possível acessar o serviço de avaliação.")

    corpo = resposta.json()
    if corpo.get("RecognitionStatus") != "Success" or not corpo.get("NBest"):
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_CONTENT, "Nenhuma fala foi reconhecida na gravação.")

    return montar_resultado(frase_id, corpo["NBest"][0])


def _notas(item: dict) -> dict:
    # A documentação do Azure mostra as notas ora soltas, ora dentro de "PronunciationAssessment"
    return item.get("PronunciationAssessment", item)


def montar_resultado(frase_id: int, melhor: dict) -> ResultadoFrase:
    palavras = [
        AvaliacaoPalavra(palavra=p["Word"], correta=_notas(p).get("ErrorType") == "None")
        for p in melhor.get("Words", [])
        if _notas(p).get("ErrorType") != "Insertion"
    ]

    erradas = [p.palavra for p in palavras if not p.correta]
    if erradas:
        dica = f"Ouça a frase de novo e pratique: {', '.join(erradas)}."
    else:
        dica = "Muito bem! Todas as palavras foram pronunciadas corretamente."

    return ResultadoFrase(frase_id=frase_id, nota=round(_notas(melhor).get("PronScore", 0)), palavras=palavras, dica=dica)
