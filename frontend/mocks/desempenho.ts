import type { AvaliacaoPalavra, ResultadoFrase, TentativaPratica } from "@/types";

export const tentativasMock: TentativaPratica[] = [
  {
    id: "t1",
    alunoLogin: "ana",
    alunoNome: "Ana",
    historiaId: 1,
    historiaTitulo: "The Little Red Hen",
    nivel: "Iniciante",
    notaGeral: 86,
    data: "01/11/2026",
    resultados: [
      {
        fraseId: 1,
        nota: 90,
        palavras: [
          { palavra: "Once", correta: true },
          { palavra: "upon", correta: true },
          { palavra: "a", correta: true },
          { palavra: "time", correta: true },
          { palavra: "there", correta: false },
          { palavra: "was", correta: true },
          { palavra: "a", correta: true },
          { palavra: "little", correta: true },
          { palavra: "red", correta: true },
          { palavra: "hen", correta: true },
        ],
        dica: "No som de 'th' em 'there', apoie a ponta da língua suavemente entre os dentes.",
      },
      {
        fraseId: 2,
        nota: 83,
        palavras: [
          { palavra: "She", correta: true },
          { palavra: "lived", correta: false },
          { palavra: "on", correta: true },
          { palavra: "a", correta: true },
          { palavra: "farm", correta: true },
          { palavra: "with", correta: false },
          { palavra: "a", correta: true },
          { palavra: "dog", correta: true },
          { palavra: "a", correta: true },
          { palavra: "cat", correta: true },
          { palavra: "and", correta: true },
          { palavra: "a", correta: true },
          { palavra: "duck", correta: true },
        ],
        dica: "Em 'lived', pronuncie o '-ed' apenas como /d/, sem criar uma sílaba extra ('lív-ed').",
      },
      {
        fraseId: 4,
        nota: 86,
        palavras: [
          { palavra: "Who", correta: true },
          { palavra: "will", correta: true },
          { palavra: "help", correta: true },
          { palavra: "me", correta: true },
          { palavra: "plant", correta: true },
          { palavra: "the", correta: true },
          { palavra: "seeds", correta: false },
        ],
        dica: "Alongue bem o som de 'ee' em 'seeds' (/iː/) e finalize com som vibrante de /z/.",
      },
    ],
  },
  {
    id: "t2",
    alunoLogin: "pedro",
    alunoNome: "Pedro",
    historiaId: 1,
    historiaTitulo: "The Little Red Hen",
    nivel: "Iniciante",
    notaGeral: 75,
    data: "02/11/2026",
    resultados: [
      {
        fraseId: 1,
        nota: 80,
        palavras: [
          { palavra: "Once", correta: true },
          { palavra: "upon", correta: true },
          { palavra: "a", correta: true },
          { palavra: "time", correta: true },
          { palavra: "there", correta: false },
          { palavra: "was", correta: true },
          { palavra: "a", correta: true },
          { palavra: "little", correta: false },
          { palavra: "red", correta: true },
          { palavra: "hen", correta: true },
        ],
        dica: "Atenção ao 'th' em 'there' e ao 'l' final de 'little', tocando a língua no céu da boca.",
      },
      {
        fraseId: 2,
        nota: 75,
        palavras: [
          { palavra: "She", correta: true },
          { palavra: "lived", correta: false },
          { palavra: "on", correta: true },
          { palavra: "a", correta: true },
          { palavra: "farm", correta: false },
          { palavra: "with", correta: false },
          { palavra: "a", correta: true },
          { palavra: "dog", correta: true },
          { palavra: "a", correta: true },
          { palavra: "cat", correta: true },
          { palavra: "and", correta: true },
          { palavra: "a", correta: true },
          { palavra: "duck", correta: true },
        ],
        dica: "Cuidado com o 'th' soprado em 'with' e feche os lábios no 'm' final de 'farm'.",
      },
      {
        fraseId: 4,
        nota: 71,
        palavras: [
          { palavra: "Who", correta: false },
          { palavra: "will", correta: true },
          { palavra: "help", correta: true },
          { palavra: "me", correta: true },
          { palavra: "plant", correta: false },
          { palavra: "the", correta: true },
          { palavra: "seeds", correta: true },
        ],
        dica: "Em 'who', o 'w' é silencioso (som inicial de /h/). Em 'plant', marque o /t/ final sem vogal extra.",
      },
    ],
  },
  {
    id: "t3",
    alunoLogin: "ana",
    alunoNome: "Ana",
    historiaId: 3,
    historiaTitulo: "A Rainy Day",
    nivel: "Básico",
    notaGeral: 84,
    data: "03/11/2026",
    resultados: [
      {
        fraseId: 10,
        nota: 78,
        palavras: [
          { palavra: "It", correta: true },
          { palavra: "was", correta: true },
          { palavra: "raining", correta: false },
          { palavra: "so", correta: true },
          { palavra: "Lucy", correta: true },
          { palavra: "could", correta: false },
          { palavra: "not", correta: true },
          { palavra: "go", correta: true },
          { palavra: "outside", correta: true },
        ],
        dica: "Em 'could', a letra 'l' é muda (/kʊd/). No 'r' inicial de 'raining', enrole levemente a língua.",
      },
      {
        fraseId: 11,
        nota: 88,
        palavras: [
          { palavra: "She", correta: true },
          { palavra: "looked", correta: true },
          { palavra: "through", correta: false },
          { palavra: "the", correta: true },
          { palavra: "window", correta: true },
          { palavra: "and", correta: true },
          { palavra: "felt", correta: true },
          { palavra: "sad", correta: true },
        ],
        dica: "Em 'through', produza o som do 'th' soprado entre os dentes seguido de 'ru' (/θruː/).",
      },
      {
        fraseId: 13,
        nota: 86,
        palavras: [
          { palavra: "Together", correta: false },
          { palavra: "they", correta: true },
          { palavra: "drew", correta: true },
          { palavra: "a", correta: true },
          { palavra: "bright", correta: true },
          { palavra: "yellow", correta: true },
          { palavra: "sun", correta: true },
        ],
        dica: "Pronuncie o 'th' no meio de 'together' de forma suave com a ponta da língua entre os dentes.",
      },
    ],
  },
  {
    id: "t4",
    alunoLogin: "pedro",
    alunoNome: "Pedro",
    historiaId: 5,
    historiaTitulo: "My First Day at School",
    nivel: "Intermediário",
    notaGeral: 70,
    data: "03/11/2026",
    resultados: [
      {
        fraseId: 18,
        nota: 67,
        palavras: [
          { palavra: "I", correta: true },
          { palavra: "was", correta: true },
          { palavra: "nervous", correta: false },
          { palavra: "when", correta: true },
          { palavra: "I", correta: true },
          { palavra: "walked", correta: false },
          { palavra: "into", correta: true },
          { palavra: "the", correta: true },
          { palavra: "classroom", correta: false },
        ],
        dica: "Em 'walked', o 'l' é mudo e o '-ed' tem som seco de /t/ (/wɔːkt/).",
      },
      {
        fraseId: 19,
        nota: 75,
        palavras: [
          { palavra: "The", correta: true },
          { palavra: "teacher", correta: true },
          { palavra: "smiled", correta: false },
          { palavra: "and", correta: true },
          { palavra: "showed", correta: false },
          { palavra: "me", correta: true },
          { palavra: "my", correta: true },
          { palavra: "desk", correta: true },
        ],
        dica: "Nos verbos 'smiled' e 'showed', una o som final de /d/ sem pronunciar a vogal 'e'.",
      },
      {
        fraseId: 20,
        nota: 69,
        palavras: [
          { palavra: "A", correta: true },
          { palavra: "boy", correta: true },
          { palavra: "named", correta: false },
          { palavra: "Leo", correta: true },
          { palavra: "asked", correta: false },
          { palavra: "me", correta: true },
          { palavra: "if", correta: true },
          { palavra: "I", correta: true },
          { palavra: "wanted", correta: false },
          { palavra: "to", correta: true },
          { palavra: "share", correta: true },
          { palavra: "his", correta: true },
          { palavra: "crayons", correta: false },
        ],
        dica: "Em 'asked', evite dizer 'ásked': o som junta /k/ e /t/ rapidamente (/æskt/).",
      },
    ],
  },
  {
    id: "t5",
    alunoLogin: "ana",
    alunoNome: "Ana",
    historiaId: 2,
    historiaTitulo: "Tom and the Big Tree",
    nivel: "Iniciante",
    notaGeral: 92,
    data: "04/11/2026",
    resultados: [
      {
        fraseId: 6,
        nota: 100,
        palavras: [
          { palavra: "Tom", correta: true },
          { palavra: "has", correta: true },
          { palavra: "a", correta: true },
          { palavra: "big", correta: true },
          { palavra: "tree", correta: true },
          { palavra: "in", correta: true },
          { palavra: "his", correta: true },
          { palavra: "garden", correta: true },
        ],
        dica: "Excelente leitura! O encontro consonantal 'tr' em 'tree' e as vogais curtas saíram muito claros.",
      },
      {
        fraseId: 7,
        nota: 86,
        palavras: [
          { palavra: "Every", correta: true },
          { palavra: "morning", correta: true },
          { palavra: "birds", correta: false },
          { palavra: "sing", correta: true },
          { palavra: "in", correta: true },
          { palavra: "the", correta: true },
          { palavra: "tree", correta: true },
        ],
        dica: "Em 'birds', mantenha a vogal central fechada com o 'r' retroflexo (/bɜːrdz/).",
      },
      {
        fraseId: 8,
        nota: 89,
        palavras: [
          { palavra: "Tom", correta: true },
          { palavra: "likes", correta: true },
          { palavra: "to", correta: true },
          { palavra: "read", correta: true },
          { palavra: "his", correta: true },
          { palavra: "books", correta: false },
          { palavra: "under", correta: true },
          { palavra: "the", correta: true },
          { palavra: "tree", correta: true },
        ],
        dica: "Em 'books', o 'oo' tem som curto (/ʊ/), diferente do som longo de 'moon'.",
      },
    ],
  },
];

export const dicasPadraoMock: Record<string, string> = {
  th: "Atenção ao som do 'th': posicione a ponta da língua suavemente entre os dentes.",
  ed: "No passado regular ('-ed'), pronuncie apenas o som final /t/ ou /d/, sem criar uma sílaba extra.",
  r: "Lembre-se de enrolar levemente a língua no 'r' do inglês, diferente do 'r' vibrante em português.",
  vogal: "Mantenha as vogais curtas firmes e evite acrescentar o som de 'i' após consoantes mudas no final.",
};

export function avaliarFraseMock(frase: { id: number; texto: string }): ResultadoFrase {
  const tokens = frase.texto
    .trim()
    .split(/\s+/)
    .map((t) => t.replace(/[.,!?;:"]/g, ""))
    .filter(Boolean);

  let dicaEscolhida = dicasPadraoMock.vogal;
  let errosMarcados = 0;

  const palavras: AvaliacaoPalavra[] = tokens.map((palavra) => {
    const minuscula = palavra.toLowerCase();

    if (errosMarcados < 2) {
      if (minuscula.includes("th") && minuscula !== "the") {
        dicaEscolhida = `${dicasPadraoMock.th} Pratique especialmente a palavra '${palavra}'.`;
        errosMarcados++;
        return { palavra, correta: false };
      }
      if (minuscula.length > 4 && minuscula.endsWith("ed")) {
        dicaEscolhida = `${dicasPadraoMock.ed} Observe a pronúncia de '${palavra}'.`;
        errosMarcados++;
        return { palavra, correta: false };
      }
      if (minuscula.startsWith("r") || minuscula.includes("wr") || minuscula.includes("cr")) {
        dicaEscolhida = `${dicasPadraoMock.r} Dê atenção especial à palavra '${palavra}'.`;
        errosMarcados++;
        return { palavra, correta: false };
      }
    }

    return { palavra, correta: true };
  });

  // Se nenhuma regra específica disparou na frase, marca a palavra mais longa (> 5 letras) para feedback didático
  if (errosMarcados === 0 && palavras.length > 0) {
    let indiceMaisLonga = -1;
    let maiorTamanho = 5;
    palavras.forEach((item, idx) => {
      if (item.palavra.length > maiorTamanho) {
        maiorTamanho = item.palavra.length;
        indiceMaisLonga = idx;
      }
    });

    if (indiceMaisLonga >= 0) {
      palavras[indiceMaisLonga].correta = false;
      dicaEscolhida = `${dicasPadraoMock.vogal} Pratique a leitura pausada de '${palavras[indiceMaisLonga].palavra}'.`;
    } else {
      dicaEscolhida = "Ótima pronúncia! Continue praticando o ritmo e a entonação da frase.";
    }
  }

  const totalCorretas = palavras.filter((p) => p.correta).length;
  const nota = palavras.length > 0 ? Math.round((totalCorretas / palavras.length) * 100) : 100;

  return {
    fraseId: frase.id,
    nota,
    palavras,
    dica: dicaEscolhida,
  };
}

