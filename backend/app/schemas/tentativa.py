from pydantic import Field

from app.schemas.avaliacao import ResultadoFrase
from app.schemas.base import ModeloBase
from app.schemas.historia import Nivel


class NovaTentativa(ModeloBase):
    aluno_login: str = Field(min_length=1)
    aluno_nome: str = Field(min_length=1)
    historia_id: int
    resultados: list[ResultadoFrase] = Field(min_length=1)


class Tentativa(NovaTentativa):
    id: str
    historia_titulo: str
    nivel: Nivel
    nota_geral: int
    data: str
