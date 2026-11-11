
import {
  Check,
  ClipboardList,
  Clock,
  Info,
  ListOrdered,
  Package,
  Target,
} from "lucide-react";
import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import type { PlanoDeAula } from "@/lib/plano";

type Props = {
  plano: PlanoDeAula;
  carregando: boolean;
  exemplo: boolean;
};

export function ResultPanel({ plano, carregando, exemplo }: Props) {
  return (
    <section
      aria-live="polite"
      className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
    >
      <header className="border-b border-border bg-secondary/60 px-5 py-5 sm:px-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-lilac-soft text-lilac-strong">
              <ClipboardList className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Plano de Aula
              </h2>
              <p className="text-sm text-muted-foreground">
                {exemplo
                  ? "Pré-visualização de exemplo"
                  : "Sugestão gerada para a sua turma"}
              </p>
            </div>
          </div>
        </div>

        {!carregando && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <Tag>{plano.turma}</Tag>
            <Tag>{plano.tema}</Tag>
            <Tag>
              <Clock className="size-3.5" /> {plano.duracao}
            </Tag>
          </div>
        )}
      </header>

      <div className="flex-1 space-y-7 px-5 py-6 sm:px-7">
        {carregando ? (
          <Carregando />
        ) : (
          <div
            key={plano.turma + plano.tema}
            className="animate-rise space-y-7"
          >
            <Secao
              icone={<Target className="size-4" />}
              titulo="Objetivos de Aprendizagem"
            >
              <ul className="space-y-2.5">
                {plano.objetivos.map((o) => (
                  <li
                    key={o}
                    className="flex gap-3 text-[0.95rem] leading-relaxed"
                  >
                    <Check className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </Secao>

            <Secao
              icone={<Package className="size-4" />}
              titulo="Materiais Necessários"
            >
              <ul className="grid gap-2 sm:grid-cols-2">
                {plano.materiais.map((m) => (
                  <li
                    key={m}
                    className="rounded-xl border border-border bg-muted px-3 py-2.5 text-sm"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </Secao>

            <Secao
              icone={<ListOrdered className="size-4" />}
              titulo="Passo a Passo da Atividade"
            >
              <ol className="space-y-4">
                {plano.passos.map((p, i) => (
                  <li key={p.titulo} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-hero text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-foreground">{p.titulo}</p>
                      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                        {p.descricao}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Secao>
          </div>
        )}
      </div>

      <footer className="flex items-start gap-2 border-t border-border px-5 py-4 text-xs text-muted-foreground sm:px-7">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <p>
          Conteúdo gerado por inteligência artificial. Deve ser revisado e
          adaptado pelo educador antes da aplicação com as crianças.
        </p>
      </footer>
    </section>
  );
}

function Secao({
  icone,
  titulo,
  children,
}: {
  icone: ReactNode;
  titulo: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-lilac-strong">
        {icone}
        {titulo}
      </h3>
      {children}
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1 text-secondary-foreground ring-1 ring-border">
      {children}
    </span>
  );
}

function Carregando() {
  return (
    <div className="space-y-7">
      {[3, 4, 4].map((n, s) => (
        <div key={s} className="space-y-3">
          <Skeleton className="h-3 w-40 bg-lilac-soft" />
          {Array.from({ length: n }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-4 bg-muted"
              style={{ width: `${90 - i * 12}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
