import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, COLORS, GRIDS, BORDERS } from "@/styles/theme";

export function Education() {
  const t = useT();
  return (
    <section id="education" className={`mx-auto max-w-7xl ${SPACING.section}`}>
      <SectionLabel eyebrow={t.education.eyebrow} title={t.education.title} />
      <div className="space-y-4">
        {t.education.items.map((it, i) => (
          <div
            key={i}
            className={`group ${BORDERS.roundedXl} ${BORDERS.borderTransparent} ${COLORS.bgCardLight} ${SPACING.cardPadding} transition ${COLORS.bgCardHover}`}
          >
            <div className={GRIDS.cardGrid1Col}>
              <p className={`${COLORS.textXsLabel} ${COLORS.textMuted} md:col-span-3`}>
                {it.period}
              </p>
              <p className={`font-display text-2xl md:col-span-6 md:text-3xl transition group-hover:${COLORS.textBase}`}>
                {it.degree}
              </p>
              <p className={`text-sm ${COLORS.textMuted} md:col-span-3 md:text-end`}>
                {it.school}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}