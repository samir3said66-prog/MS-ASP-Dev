import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, COLORS, ANIMATIONS, COMPONENTS, GRIDS, BORDERS } from "@/styles/theme";

export function Skills() {
  const t = useT();
  return (
    <section id="skills" className={`mx-auto max-w-7xl ${SPACING.section}`}>
      <SectionLabel eyebrow={t.skills.eyebrow} title={t.skills.title} />
      <div className={GRIDS.sectionLayout}>
        <div className="md:col-span-3" />
        <div className={`space-y-8 md:col-span-9`}>
          {t.skills.groups.map((g, groupIndex) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className={`${GRIDS.cardGrid1Col} ${BORDERS.roundedXl} ${BORDERS.borderTransparent} ${COLORS.bgCardLight} ${SPACING.cardPadding} transition ${COLORS.bgCardHover}`}
            >
              <p className={`${COLORS.textXsLabel} font-bold ${COLORS.textMuted} md:col-span-3`}>
                {g.name}
              </p>
              <ul className={`flex flex-wrap ${SPACING.smallGap} md:col-span-9`}>
                {g.items.map((item, i) => (
                  <motion.li
                    key={item}
                    {...ANIMATIONS.scaleIn}
                    transition={{ ...ANIMATIONS.scaleIn.transition, delay: i * 0.05 }}
                    className={COMPONENTS.badge}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}