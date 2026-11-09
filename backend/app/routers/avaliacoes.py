import struct

from fastapi import APIRouter, HTTPException, UploadFile, status

from app.routers.historias import buscar_historia
from app.schemas.avaliacao import ResultadoFrase
from app.services.pronuncia import avaliar_pronuncia

router = APIRouter(tags=["Avaliação de pronúncia"])

# 30 segundos de WAV 16 kHz, 16 bits, mono, que é o máximo aceito pelo Azure
TAMANHO_MAXIMO = 30 * 16000 * 2 + 44


def eh_wav_aceito(audio: bytes) -> bool:
    if len(audio) < 44 or audio[:4] != b"RIFF" or audio[8:12] != b"WAVE":
        return False
    formato, canais, taxa = struct.unpack_from("<HHI", audio, 20)
    bits = struct.unpack_from("<H", audio, 34)[0]
    return formato == 1 and canais == 1 and taxa == 16000 and bits == 16


@router.post("/historias/{historia_id}/frases/{frase_id}/avaliacao")
async def avaliar_frase(historia_id: int, frase_id: int, audio: UploadFile) -> ResultadoFrase:
    historia = buscar_historia(historia_id)
    frase = next((f for f in historia.frases if f.id == frase_id), None)
    if frase is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Frase não encontrada nesta história.")

    # O áudio fica só na memória durante a requisição e não é salvo
    conteudo = await audio.read()
    if len(conteudo) > TAMANHO_MAXIMO:
        raise HTTPException(status.HTTP_413_CONTENT_TOO_LARGE, "A gravação deve ter no máximo 30 segundos.")
    if not eh_wav_aceito(conteudo):
        raise HTTPException(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, "Envie o áudio em WAV, 16 kHz, 16 bits, mono.")

    return await avaliar_pronuncia(conteudo, frase.id, frase.texto)
