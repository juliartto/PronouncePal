# Prática de Oralidade em Inglês

Sistema web em que alunos da educação básica praticam a leitura em voz alta de pequenas histórias em inglês cadastradas pelos professores, recebendo feedback de pronúncia gerado por IA.

> Trabalho final da disciplina de Desenvolvimento Web (UTFPR).

## Estrutura

```
frontend/   Next.js + Tailwind CSS
backend/    FastAPI + SQLModel
```

## Pré-requisitos

- Node.js 20 ou superior
- Python 3.12 ou superior

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/macOS
pip install -r requirements.txt
cp .env.example .env
fastapi dev app/main.py
```

A API fica em http://localhost:8000 e a documentação em http://localhost:8000/docs.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

O site fica em http://localhost:3000.

Para gerar a versão estática (pasta `frontend/out/`):

```bash
npm run build
```

## Variáveis de ambiente

| Onde | Variável | Descrição |
|---|---|---|
| backend | `CORS_ORIGINS` | Origens liberadas, separadas por vírgula |
