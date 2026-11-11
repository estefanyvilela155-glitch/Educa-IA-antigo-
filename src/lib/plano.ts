
export type PlanoDeAula = {
  turma: string;
  tema: string;
  duracao: string;
  objetivos: string[];
  materiais: string[];
  passos: { titulo: string; descricao: string }[];
};

export type PedidoPlano = { turma: string; tema: string };

const capitalizar = (t: string) =>
  t ? t.charAt(0).toUpperCase() + t.slice(1) : t;

function ehBebe(turma: string) {
  return /ber[çc]|beb[eê]|0\s*a\s*1|grupo\s*1\b/i.test(turma);
}

/** Monta um plano de aula de exemplo a partir da turma e do tema. */
export function montarPlano({ turma, tema }: PedidoPlano): PlanoDeAula {
  const t = tema.trim().toLowerCase();
  const turmaFmt = capitalizar(turma.trim());
  const bebe = ehBebe(turma);

  return {
    turma: turmaFmt,
    tema: capitalizar(tema.trim()),
    duracao: bebe ? "15 a 20 minutos" : "30 a 40 minutos",
    objetivos: [
      `Explorar ${t} por meio de experiências sensoriais e brincadeiras.`,
      bebe
        ? "Estimular a percepção, o movimento e a interação com o adulto de referência."
        : "Desenvolver autonomia, linguagem oral e cooperação entre os colegas.",
      "Ampliar a curiosidade e o prazer em descobrir o mundo ao redor.",
    ],
    materiais: bebe
      ? [
          "Tapete de EVA ou colchonete",
          "Objetos macios e seguros de diferentes texturas",
          "Garrafas sensoriais coloridas (bem vedadas)",
          "Música calma para o momento de acolhimento",
        ]
      : [
          "Folhas grandes de papel kraft",
          "Tinta guache atóxica e pincéis grossos",
          "Peças de encaixe ou blocos coloridos",
          "Caixa-surpresa com objetos relacionados ao tema",
        ],
    passos: [
      {
        titulo: "Acolhimento",
        descricao: `Reúna a turma em roda, cante uma música conhecida e apresente o tema "${t}" com entusiasmo.`,
      },
      {
        titulo: "Exploração livre",
        descricao: bebe
          ? "Disponha os materiais no tapete e deixe os bebês tocarem, sacudirem e explorarem com acompanhamento."
          : "Abra a caixa-surpresa e convide as crianças a manusear e nomear os objetos encontrados.",
      },
      {
        titulo: "Atividade orientada",
        descricao: bebe
          ? "Mostre movimentos simples (pegar, soltar, empilhar) e incentive a imitação, celebrando cada tentativa."
          : `Proponha uma criação coletiva no papel kraft relacionada a ${t}, incentivando a troca de ideias.`,
      },
      {
        titulo: "Roda de conversa",
        descricao: bebe
          ? "Retome a experiência com gestos e palavras, nomeando o que foi explorado."
          : "Convide cada criança a contar o que mais gostou e exponha a produção na sala.",
      },
    ],
  };
}

/**
 * Gera a sugestão pedagógica. Atualmente é uma simulação local;
 * futuramente poderá ser substituída por uma chamada real de IA.
 */
export async function gerarPlano(
  pedido: PedidoPlano
): Promise<PlanoDeAula> {
  await new Promise((r) => setTimeout(r, 1200));
  return montarPlano(pedido);
}

export const PLANO_EXEMPLO = montarPlano({
  turma: "Berçário",
  tema: "Cores",
});
