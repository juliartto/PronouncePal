from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app import dados
from app.schemas.usuario import Token
from app.seguranca import criar_token, hash_senha

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/login")
def login(formulario: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    login = formulario.username.strip().lower()
    usuario = next((u for u in dados.usuarios if u.usuario == login), None)
    if usuario is None or not hash_senha.verify(formulario.password, usuario.senha_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Usuário ou senha incorretos.")
    return Token(access_token=criar_token(usuario), usuario=usuario)
