# PronouncePal

Sistema web para alunos da educação básica praticarem a oralidade em inglês. O professor cadastra pequenas histórias, o aluno ouve a leitura, grava a própria voz lendo as frases e recebe um feedback de pronúncia gerado por IA.

Trabalho final da disciplina de Desenvolvimento Web (UTFPR).

**Site:** https://pronounce-pal.vercel.app

**API:** https://pronouncepal.onrender.com/docs

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

Variáveis do `backend/.env`:

| Variável | Descrição |
|---|---|
| `CORS_ORIGINS` | Endereços do frontend que podem acessar a API, separados por vírgula |
| `AZURE_SPEECH_KEY` | Chave do recurso Speech do Azure |
| `AZURE_SPEECH_REGION` | Região do recurso Speech (ex.: `eastus`) |

Sem a chave do Azure, a API funciona, mas a rota de avaliação responde 503.

Rotas:

| Método | Rota | Descrição |
|---|---|---|
| GET | `/historias` | Lista as histórias |
| GET | `/historias/{id}` | Uma história com as frases |
| POST | `/historias` | Cadastra uma história |
| POST | `/historias/{id}/frases/{id}/avaliacao` | Avalia a pronúncia de uma frase (áudio WAV, 16 kHz, mono, até 30 s) |
| GET | `/tentativas` | Lista as práticas registradas |
| POST | `/tentativas` | Registra uma prática |

Nesta etapa os dados ficam em memória e voltam ao estado inicial quando a API reinicia.

Para publicar no Render, crie um Web Service com:

- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `fastapi run app/main.py --port $PORT`
- As variáveis de ambiente acima, com `CORS_ORIGINS` incluindo o endereço do site na Vercel

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
