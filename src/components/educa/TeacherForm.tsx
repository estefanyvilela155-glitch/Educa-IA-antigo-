
import { useState, type FormEvent } from "react";
import { Loader2, Sparkles, Users, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { PedidoPlano } from "@/lib/plano";

const TURMAS = ["Berçário", "Grupo 1", "Grupo 2", "Grupo 3", "Pré-escola"];
const TEMAS = ["Coordenação motora", "Cores", "Formas", "Animais", "Música"];

type Props = {
  carregando: boolean;
  onGerar: (p: PedidoPlano) => void;
};

export function TeacherForm({ carregando, onGerar }: Props) {
  const [turma, setTurma] = useState("");
  const [tema, setTema] = useState("");

  const valido = turma.trim().length > 0 && tema.trim().length > 0;

  function submeter(e: FormEvent) {
    e.preventDefault();
    if (valido && !carregando) onGerar({ turma, tema });
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-sky-soft text-primary">
          <Users className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Formulário do Professor
          </h2>
          <p className="text-sm text-muted-foreground">
            Conte-nos sobre a sua turma.
          </p>
        </div>
      </div>

      <form onSubmit={submeter} className="space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="turma" className="text-sm font-bold text-foreground">
            Faixa Etária / Turma
          </Label>

          <Input
            id="turma"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            placeholder="Ex: Berçário, Grupo 1"
            className="h-12 rounded-xl bg-background text-base"
          />

          <Chips opcoes={TURMAS} ativo={turma} onEscolher={setTurma} />
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="tema" className="text-sm font-bold text-foreground">
            Tema ou Objetivo da Atividade
          </Label>

          <div className="relative">
            <Target className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground" />

            <Textarea
              id="tema"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ex: coordenação motora, cores"
              rows={3}
              className="min-h-24 resize-none rounded-xl bg-background pl-10 text-base"
            />
          </div>

          <Chips opcoes={TEMAS} ativo={tema} onEscolher={setTema} />
        </div>

        <Button
          type="submit"
          variant="lilac"
          size="xl"
          disabled={!valido || carregando}
          className="w-full whitespace-normal text-center"
        >
          {carregando ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {carregando
            ? "A gerar sugestão…"
            : "Gerar Sugestão Pedagógica com IA"}
        </Button>

        {!valido && (
          <p className="text-center text-xs text-muted-foreground">
            Preencha os dois campos para gerar a sugestão.
          </p>
        )}
      </form>
    </section>
  );
}

function Chips({
  opcoes,
  ativo,
  onEscolher,
}: {
  opcoes: string[];
  ativo: string;
  onEscolher: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {opcoes.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onEscolher(o)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
            ativo === o
              ? "border-lilac bg-lilac-soft text-accent-foreground"
              : "border-border bg-background text-muted-foreground hover:border-lilac hover:text-accent-foreground"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
