from fastapi import APIRouter, HTTPException, status

from app import dados
from app.schemas.historia import Frase, Historia, NovaHistoria

router = APIRouter(prefix="/historias", tags=["Histórias"])


def buscar_historia(historia_id: int) -> Historia:
    historia = next((h for h in dados.historias if h.id == historia_id), None)
    if historia is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "História não encontrada.")
    return historia


@router.get("")
def listar_historias() -> list[Historia]:
    return dados.historias


@router.get("/{historia_id}")
def obter_historia(historia_id: int) -> Historia:
    return buscar_historia(historia_id)


@router.post("", status_code=status.HTTP_201_CREATED)
def criar_historia(nova: NovaHistoria) -> Historia:
    proximo_id_frase = max((f.id for h in dados.historias for f in h.frases), default=0) + 1
    historia = Historia(
        id=max((h.id for h in dados.historias), default=0) + 1,
        titulo=nova.titulo,
        nivel=nova.nivel,
        autor=nova.autor,
        frases=[
            Frase(id=proximo_id_frase + i, texto=frase.texto, praticar=frase.praticar)
            for i, frase in enumerate(nova.frases)
        ],
    )
    dados.historias.append(historia)
    return historia
