import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, COLORS, ANIMATIONS, BORDERS } from "@/styles/theme";

export function Projects() {
  const t = useT();
  const items = t.projects.items;
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => set.add(p.category));
    return [t.projects.all, ...Array.from(set)];
  }, [items, t.projects.all]);
  const [active, setActive] = useState(t.projects.all);

  const visible = active === t.projects.all ? items : items.filter((p) => p.category === active);

  return (
    <section id="projects" className={`mx-auto max-w-7xl ${SPACING.section}`}>
      <SectionLabel eyebrow={t.projects.eyebrow} title={t.projects.title} />

      <div className="mb-12 flex flex-wrap gap-2 justify-center md:justify-start">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={[
              "inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition",
              active === c
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((p, i) => (
          <motion.div
            key={p.slug}
            {...ANIMATIONS.cardIn}
            transition={{ ...ANIMATIONS.cardIn.transition, delay: i * 0.05 }}
            className={`${BORDERS.roundedLg} ${BORDERS.borderTransparent} ${COLORS.bgCardLight} transition ${COLORS.bgCardHover}`}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col gap-4 p-6 md:p-8 md:grid md:grid-cols-12 md:items-center"
            >
              <span className={`text-xs ${COLORS.textMuted} md:col-span-1`}>
                0{i + 1}
              </span>
              <div className="md:col-span-5">
                <span className="block font-display text-2xl leading-tight transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1 sm:text-3xl md:text-3xl">
                  {p.name}
                </span>
                <span className={`mt-2 block text-xs ${COLORS.textMuted} md:hidden`}>
                  {p.summary} · {p.year}
                </span>
              </div>
              <span className={`hidden text-sm ${COLORS.textMuted} md:col-span-4 md:block`}>
                {p.summary}
              </span>
              <span className={`hidden text-xs uppercase tracking-[0.18em] ${COLORS.textMuted} md:col-span-1 md:block`}>
                {p.year}
              </span>
              <span className="flex items-center justify-start md:col-span-1 md:justify-end">
                <ArrowUpRight className={`size-5 ${COLORS.textMuted} transition group-hover:${COLORS.textBase}`} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}