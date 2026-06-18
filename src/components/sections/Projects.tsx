import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LayoutGrid, Search, X } from "lucide-react";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, COLORS, ANIMATIONS, BORDERS, FONTS, COMPONENTS } from "@/styles/theme";

export function Projects() {
  const t = useT();
  const items = t.projects.items;

  const allCategoryLabel = t.projects.all;

  const uniqueCategories = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const p of items) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        out.push(p.category);
      }
    }
    return out;
  }, [items]);

  const filterPills = [allCategoryLabel, ...uniqueCategories.slice(0, 3)];

  const [active, setActive] = useState(allCategoryLabel);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modalFilter, setModalFilter] = useState(allCategoryLabel);

  const sectionItems = useMemo(() => {
    const base = active === allCategoryLabel ? items : items.filter((p) => p.category === active);
    return base.slice(0, 3);
  }, [items, active, allCategoryLabel]);

  const allModalCategories = useMemo(
    () => [allCategoryLabel, ...uniqueCategories],
    [allCategoryLabel, uniqueCategories],
  );

  const modalItems = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((p) => {
      const catMatch = modalFilter === allCategoryLabel || p.category === modalFilter;
      const textMatch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [items, modalFilter, search, allCategoryLabel]);

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      <section id="projects" className={`mx-auto max-w-7xl ${SPACING.section}`}>
        <SectionLabel eyebrow={t.projects.eyebrow} title={t.projects.title} />

        <div className="mb-12 flex flex-wrap gap-2 justify-center md:justify-start">
          {filterPills.map((c) => (
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
          {sectionItems.map((p, i) => (
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
                <span className={`${FONTS.labelXs} ${COLORS.textMuted} md:col-span-1`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-5">
                  <span
                    className={`${FONTS.displayMd} leading-tight transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1`}
                  >
                    {p.name}
                  </span>
                  <span className={`mt-2 block ${FONTS.bodyXs} ${COLORS.textMuted} md:hidden`}>
                    {p.summary} · {p.year}
                  </span>
                </div>
                <span
                  className={`hidden ${FONTS.bodyMd} ${COLORS.textMuted} md:col-span-4 md:block`}
                >
                  {p.summary}
                </span>
                <span
                  className={`hidden ${FONTS.labelXs} ${COLORS.textMuted} md:col-span-1 md:block`}
                >
                  {p.year}
                </span>
                <span className="flex items-center justify-start md:col-span-1 md:justify-end">
                  <ArrowUpRight
                    className={`size-5 ${COLORS.textMuted} transition group-hover:${COLORS.textBase}`}
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className={COMPONENTS.buttonSecondary}
          >
            <LayoutGrid className="size-4" />
            All {items.length} projects
          </button>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-12 md:p-8 md:py-16">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 flex w-full max-w-5xl flex-col rounded-2xl border border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className={`${FONTS.displaySm}`}>All Projects</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border transition hover:bg-card"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 border-b border-border px-6 py-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search projects…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full rounded-lg border border-border bg-card/50 ps-9 pe-4 py-2.5 ${FONTS.bodySm} outline-none transition focus:border-foreground`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {allModalCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setModalFilter(c)}
                    className={[
                      "inline-flex rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition",
                      modalFilter === c
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-card/30">
                  <tr>
                    <th className="px-6 py-3 text-start text-xs uppercase tracking-[0.18em] text-muted-foreground w-14">
                      #
                    </th>
                    <th className="px-4 py-3 text-start text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Project
                    </th>
                    <th className="hidden px-4 py-3 text-start text-xs uppercase tracking-[0.18em] text-muted-foreground md:table-cell">
                      Category
                    </th>
                    <th className="hidden px-4 py-3 text-start text-xs uppercase tracking-[0.18em] text-muted-foreground md:table-cell w-20">
                      Year
                    </th>
                    <th className="px-4 py-3 text-start text-xs uppercase tracking-[0.18em] text-muted-foreground w-20">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {modalItems.map((p, i) => (
                    <tr key={p.slug} className="transition hover:bg-card/30">
                      <td className={`px-6 py-4 ${FONTS.labelXs} ${COLORS.textMuted}`}>
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-4">
                        <div className={`${FONTS.displayXs} leading-snug`}>{p.name}</div>
                        <div className={`mt-0.5 ${FONTS.bodyXs} ${COLORS.textMuted} line-clamp-1 md:hidden`}>
                          {p.category} · {p.year}
                        </div>
                        <div className={`mt-0.5 ${FONTS.bodyXs} ${COLORS.textMuted} line-clamp-1 hidden md:block`}>
                          {p.summary}
                        </div>
                      </td>
                      <td className="hidden px-4 py-4 md:table-cell">
                        <span
                          className={`inline-flex rounded-full border border-border/60 bg-card/40 px-2.5 py-1 ${FONTS.labelXs}`}
                        >
                          {p.category}
                        </span>
                      </td>
                      <td className={`hidden px-4 py-4 ${FONTS.labelXs} ${COLORS.textMuted} md:table-cell`}>
                        {p.year}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          to="/projects/$slug"
                          params={{ slug: p.slug }}
                          onClick={() => setModalOpen(false)}
                          className={`inline-flex items-center gap-1 ${FONTS.labelXs} ${COLORS.textMuted} transition hover:${COLORS.textBase}`}
                        >
                          Open <ArrowUpRight className="size-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {modalItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className={`px-6 py-16 text-center ${FONTS.bodySm} ${COLORS.textMuted}`}
                      >
                        No projects match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-border px-6 py-3">
              <span className={`${FONTS.labelXs} ${COLORS.textMuted}`}>
                {modalItems.length} project{modalItems.length !== 1 ? "s" : ""} shown
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
