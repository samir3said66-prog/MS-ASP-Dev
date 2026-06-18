import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n/useT";
import { FONTS, COLORS, COMPONENTS } from "@/styles/theme";
import { ThemeToggle, LocaleToggle } from "./Toggles";

const SECTIONS = ["about", "skills", "projects", "experience", "education", "contact"] as const;

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur-lg shadow-sm"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <a
          href="/"
          className={`${FONTS.displayXs} leading-none`}
          aria-label="Home"
        >
          ✦
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`/#${id}`}
              className={`group relative ${FONTS.labelXs} ${COLORS.textMuted} transition hover:${COLORS.textBase}`}
            >
              {t.nav[id]}
              <span className="absolute -bottom-1 start-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/resume.pdf"
            download
            className={`${COMPONENTS.buttonPrimary}`}
          >
            <Download className="size-3.5" />
            {t.nav.resume}
          </a>
          <LocaleToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 transition hover:border-foreground/40 md:hidden"
          aria-label={t.nav.menu}
          aria-expanded={open}
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-0 top-[64px] z-40 flex flex-col gap-2 ${COLORS.bgMobileMenu} backdrop-blur-md px-6 py-8 md:hidden border-t border-border/40 overflow-y-auto`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="space-y-1"
            >
              {SECTIONS.map((id, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <a
                    href={`/#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-border/40 py-4 ${FONTS.displaySm} transition hover:${COLORS.textBase} hover:pl-2 hover:border-foreground/40`}
                  >
                    {t.nav[id]}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="mt-6 space-y-3"
            >
              <a
                href="/resume.pdf"
                download
                className={`${COMPONENTS.buttonPrimary} flex justify-center`}
              >
                <Download className="size-3.5" />
                {t.nav.resume}
              </a>
              <div className="flex items-center gap-2 pt-2">
                <LocaleToggle />
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}