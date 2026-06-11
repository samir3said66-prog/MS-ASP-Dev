import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, COLORS, GRIDS, BORDERS, FONTS } from "@/styles/theme";

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
              <p className={`${FONTS.labelMd} ${COLORS.textMuted} md:col-span-3`}>
                {it.period}
              </p>
              <p className={`${FONTS.displaySm} transition group-hover:${COLORS.textBase} md:col-span-6`}>
                {it.degree}
              </p>
              <p className={`${FONTS.bodyMd} ${COLORS.textMuted} md:col-span-3 md:text-end`}>
                {it.school}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}