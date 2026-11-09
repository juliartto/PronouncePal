from datetime import date

from fastapi import APIRouter, HTTPException, status

from app import dados
from app.routers.historias import buscar_historia
from app.schemas.tentativa import NovaTentativa, Tentativa

router = APIRouter(prefix="/tentativas", tags=["Tentativas"])


@router.get("")
def listar_tentativas() -> list[Tentativa]:
    return dados.tentativas


@router.post("", status_code=status.HTTP_201_CREATED)
def registrar_tentativa(nova: NovaTentativa) -> Tentativa:
    historia = buscar_historia(nova.historia_id)

    ids_frases = {frase.id for frase in historia.frases}
    if any(resultado.frase_id not in ids_frases for resultado in nova.resultados):
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_CONTENT, "Há resultados de frases que não são desta história.")

    tentativa = Tentativa(
        **nova.model_dump(),
        id=f"t{len(dados.tentativas) + 1}",
        historia_titulo=historia.titulo,
        nivel=historia.nivel,
        nota_geral=round(sum(r.nota for r in nova.resultados) / len(nova.resultados)),
        data=date.today().strftime("%d/%m/%Y"),
    )
    dados.tentativas.insert(0, tentativa)
    return tentativa
