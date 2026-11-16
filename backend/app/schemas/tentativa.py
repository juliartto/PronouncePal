from pydantic import Field

from app.schemas.avaliacao import ResultadoFrase
from app.schemas.base import ModeloBase
from app.schemas.historia import Nivel


class NovaTentativa(ModeloBase):
    historia_id: int
    resultados: list[ResultadoFrase] = Field(min_length=1)


class Tentativa(NovaTentativa):
    id: str
    aluno_login: str
    aluno_nome: str
    historia_titulo: str
    nivel: Nivel
    nota_geral: int
    data: str
