const URL_API = process.env.NEXT_PUBLIC_API_URL;

interface Opcoes {
  metodo?: "GET" | "POST";
  token?: string;
  corpo?: unknown;
}

export async function requisitar<T>(caminho: string, { metodo = "GET", token, corpo }: Opcoes = {}): Promise<T> {
  const cabecalhos: Record<string, string> = {};
  if (token) cabecalhos.Authorization = `Bearer ${token}`;

  // FormData e URLSearchParams vão como estão, o resto vira JSON
  let body: BodyInit | undefined;
  if (corpo instanceof FormData || corpo instanceof URLSearchParams) {
    body = corpo;
  } else if (corpo !== undefined) {
    body = JSON.stringify(corpo);
    cabecalhos["Content-Type"] = "application/json";
  }

  let resposta: Response;
  try {
    resposta = await fetch(`${URL_API}${caminho}`, { method: metodo, headers: cabecalhos, body });
  } catch {
    throw new Error("Não foi possível conectar ao servidor. Tente novamente.");
  }

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    // O FastAPI devolve "detail" como texto ou, nos erros de validação, como lista
    const detalhe = dados?.detail;
    throw new Error(typeof detalhe === "string" ? detalhe : (detalhe?.[0]?.msg ?? "Ocorreu um erro. Tente novamente."));
  }
  return dados as T;
}
