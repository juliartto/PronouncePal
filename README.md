# PronouncePal

Sistema web para alunos da educação básica praticarem a oralidade em inglês. O professor cadastra pequenas histórias, o aluno ouve a leitura, grava a própria voz lendo as frases e recebe um feedback de pronúncia gerado por IA.

Trabalho final da disciplina de Desenvolvimento Web (UTFPR).

## O problema

As aulas de inglês têm pouco tempo para a prática da fala. Com turmas grandes e poucos recursos, é difícil cada aluno ler em voz alta e receber uma correção individual. O PronouncePal oferece essa prática fora da sala de aula, com correção imediata.

## Funcionalidades

**Aluno**
- Ver as histórias disponíveis, com busca por título e filtro por nível
- Ouvir a leitura da história e de cada frase
- Gravar a leitura de uma frase e enviar para correção
- Ver a nota, as palavras pronunciadas de forma incorreta e uma dica

**Professor**
- Cadastrar uma história, que é dividida em frases automaticamente
- Escolher quais frases os alunos vão praticar
- Acompanhar o desempenho dos alunos (notas e palavras com mais erro)

## Uso de IA

A gravação do aluno é enviada para a API, que usa o serviço de avaliação de pronúncia do **Azure Speech** para comparar o áudio com o texto da frase. O serviço devolve uma nota geral e uma nota por palavra, e o sistema mostra ao aluno onde ele errou. O áudio não é armazenado: ele é usado só na correção e depois descartado.

## Tecnologias

| Parte | Tecnologias |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Python, FastAPI |
| Banco de dados | SQLModel (SQLite local, PostgreSQL em produção) |
| Autenticação | JWT |
| IA | Azure Speech (Pronunciation Assessment) |

## Estrutura do repositório

```
frontend/   site em Next.js
backend/    API em FastAPI
```

## Como rodar

### Pré-requisitos

- Node.js 20 ou superior
- Python 3.12 ou superior

### Backend

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

### Frontend

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