import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";

export function Education() {
  const t = useT();
  return (
    <section id="education" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
      <SectionLabel eyebrow={t.education.eyebrow} title={t.education.title} />
      <div className="space-y-4">
        {t.education.items.map((it, i) => (
          <div
            key={i}
            className="group rounded-xl border border-border bg-card/30 p-6 transition hover:bg-card/50 hover:border-foreground/30 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-12 md:items-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
                {it.period}
              </p>
              <p className="font-display text-2xl md:col-span-6 md:text-3xl transition group-hover:text-foreground">
                {it.degree}
              </p>
              <p className="text-sm text-muted-foreground md:col-span-3 md:text-end">
                {it.school}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}