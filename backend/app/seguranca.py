from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash

from app import dados
from app.config import settings
from app.schemas.usuario import Usuario

hash_senha = PasswordHash.recommended()
esquema_oauth2 = OAuth2PasswordBearer(tokenUrl="auth/login")


def criar_token(usuario: Usuario) -> str:
    expira = datetime.now(timezone.utc) + timedelta(hours=settings.jwt_horas)
    return jwt.encode({"sub": usuario.usuario, "exp": expira}, settings.jwt_secret, algorithm="HS256")


def usuario_logado(token: Annotated[str, Depends(esquema_oauth2)]) -> Usuario:
    erro = HTTPException(
        status.HTTP_401_UNAUTHORIZED,
        "Sessão inválida ou expirada. Entre novamente.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        login = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])["sub"]
    except jwt.InvalidTokenError:
        raise erro
    usuario = next((u for u in dados.usuarios if u.usuario == login), None)
    if usuario is None:
        raise erro
    return usuario


def professor_logado(usuario: Annotated[Usuario, Depends(usuario_logado)]) -> Usuario:
    if usuario.papel != "professor":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Apenas professores podem fazer isso.")
    return usuario


def aluno_logado(usuario: Annotated[Usuario, Depends(usuario_logado)]) -> Usuario:
    if usuario.papel != "aluno":
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Apenas alunos podem fazer isso.")
    return usuario
