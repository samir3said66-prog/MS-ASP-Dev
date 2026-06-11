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
        <div className={GRIDS.sectionLayout}>
          {/* Left column - empty for spacing */}
          <div className="md:col-span-2" />
          
          {/* Main content */}
          <div className="md:col-span-8 space-y-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`${FONTS.labelSm} ${COLORS.textMuted}`}
            >
              — {t.hero.eyebrow}
            </motion.p>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`font-title text-[clamp(3.5rem,12vw,8rem)] leading-[0.9] tracking-tight ${COLORS.textBase}`}
            >
              {t.hero.title.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            {/* Lede/subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`max-w-2xl ${FONTS.bodyLg} ${COLORS.textMuted} pt-4`}
            >
              {t.hero.lede}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 pt-8"
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
          </div>

          {/* Right column - empty for spacing */}
          <div className="md:col-span-2" />
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