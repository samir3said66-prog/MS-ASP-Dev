import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useT } from "@/i18n/useT";
import { FONTS, COLORS, COMPONENTS, GRIDS } from "@/styles/theme";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const InkParticles = lazy(() => import("../three/InkParticles"));

export function Hero() {
  const t = useT();
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh flex-col justify-between overflow-hidden px-6 pt-32 pb-10 md:px-10"
    >
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          <Suspense fallback={null}>
            <InkParticles />
          </Suspense>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center">
        {/* Two column layout: Left metadata, Right main content */}
        <div className={GRIDS.sectionLayout}>
          {/* Left column - Metadata/Tags */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-4 flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4">
              <p className={`${FONTS.labelSm} ${COLORS.textMuted}`}>
                — {t.hero.eyebrow}
              </p>
              <div className="space-y-3">
                {t.hero.title.map((line, i) => (
                  <p key={i} className={`${FONTS.displaySm} ${COLORS.textBase}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column - Main description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-8 flex flex-col justify-center pl-4 md:pl-12 border-l border-border/40"
          >
            {/* Main lede */}
            <p className={`${FONTS.bodyXl} ${COLORS.textMuted} leading-relaxed tracking-[-0.01em]`}>
              {t.hero.lede}
            </p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <a
                href="#projects"
                className={`group ${COMPONENTS.buttonPrimary}`}
              >
                {t.hero.cta}
                <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
              <a
                href="#contact"
                className={`${COMPONENTS.buttonSecondary}`}
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mx-auto flex w-full max-w-7xl items-end justify-between">
        <p className={`${FONTS.labelSm} ${COLORS.textMuted}`}>
          {t.hero.location}
        </p>
        <ArrowDown className="size-4 animate-bounce text-muted-foreground" aria-hidden />
      </div>
    </section>
  );
}