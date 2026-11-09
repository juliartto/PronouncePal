from typing import Literal

from pydantic import Field, field_validator

from app.schemas.base import ModeloBase

Nivel = Literal["Iniciante", "Básico", "Intermediário"]


class Frase(ModeloBase):
    id: int
    texto: str
    praticar: bool


class Historia(ModeloBase):
    id: int
    titulo: str
    nivel: Nivel
    autor: str
    frases: list[Frase]


class NovaFrase(ModeloBase):
    texto: str = Field(min_length=1)
    praticar: bool = True


class NovaHistoria(ModeloBase):
    titulo: str = Field(min_length=1, max_length=100)
    nivel: Nivel
    autor: str = Field(min_length=1)
    frases: list[NovaFrase] = Field(min_length=1)

    @field_validator("frases")
    @classmethod
    def exigir_frase_para_praticar(cls, frases: list[NovaFrase]) -> list[NovaFrase]:
        if not any(frase.praticar for frase in frases):
            raise ValueError("Marque pelo menos uma frase para os alunos praticarem.")
        return frases
