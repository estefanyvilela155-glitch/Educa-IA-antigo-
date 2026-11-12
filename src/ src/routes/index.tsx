import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import emblem from "@/assets/educa-emblem.png";
import { ResultPanel } from "@/components/educa/ResultPanel";
import { TeacherForm } from "@/components/educa/TeacherForm";
import { gerarPlano, PLANO_EXEMPLO, type PedidoPlano, type PlanoDeAula } from "@/lib/plano";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Educa.IA — Sugestões pedagógicas com inteligência" },
      {
        name: "description",
        content:
          "Gere planos de aula para a educação infantil com objetivos, materiais e passo a passo em segundos.",
      },
      { property: "og:title", content: "Educa.IA — Sugestões pedagógicas com inteligência" },
      {
        property: "og:description",
        content: "Aprender, ensinar e evoluir com inteligência.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [plano, setPlano] = useState<PlanoDeAula>(PLANO_EXEMPLO);
  const [exemplo, setExemplo] = useState(true);
  const [carregando, setCarregando] = useState(false);

  async function gerar(pedido: PedidoPlano) {
    setCarregando(true);
    try {
      setPlano(await gerarPlano(pedido));
      setExemplo(false);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="bg-hero text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-8 sm:gap-5 sm:py-12">
          <div className="grid size-16 shrink-0 place-items-center rounded-3xl bg-card shadow-soft sm:size-20">
            <img src={emblem} alt="" width={816} height={816} className="size-12 sm:size-16" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Educa.IA
            </h1>
            <p className="mt-1 text-base opacity-90 sm:text-lg">
              Aprender, ensinar e evoluir com inteligência.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-5 sm:py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <TeacherForm carregando={carregando} onGerar={gerar} />
        </div>
        <ResultPanel plano={plano} carregando={carregando} exemplo={exemplo} />
      </main>
    </div>
  );
}
