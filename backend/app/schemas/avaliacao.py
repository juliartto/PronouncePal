from pydantic import Field

from app.schemas.base import ModeloBase


class AvaliacaoPalavra(ModeloBase):
    palavra: str
    correta: bool


class ResultadoFrase(ModeloBase):
    frase_id: int
    nota: int = Field(ge=0, le=100)
    palavras: list[AvaliacaoPalavra]
    dica: str
