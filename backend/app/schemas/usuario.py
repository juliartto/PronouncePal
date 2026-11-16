from typing import Literal

from pydantic import BaseModel

from app.schemas.base import ModeloBase

Papel = Literal["aluno", "professor"]


class Usuario(ModeloBase):
    id: int
    nome: str
    usuario: str
    papel: Papel


class UsuarioComSenha(Usuario):
    senha_hash: str


# Fica em snake_case porque é o formato que o botão "Authorize" do /docs espera
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: Usuario
