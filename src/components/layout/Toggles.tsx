import { useEffect, useState } from "react";
import { Moon, Sun, Languages } from "lucide-react";
import { usePreferences } from "@/store/preferences";
import { useT } from "@/i18n/useT";

export function ThemeToggle() {
  const theme = usePreferences((s) => s.theme);
  const toggle = usePreferences((s) => s.toggleTheme);
  const t = useT();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.toggle.theme}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/40 backdrop-blur transition hover:bg-foreground hover:text-background"
    >
      {mounted ? (
        theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />
      ) : (
        <span className="size-4" aria-hidden />
      )}
    </button>
  );
}

export function LocaleToggle() {
  const locale = usePreferences((s) => s.locale);
  const toggle = usePreferences((s) => s.toggleLocale);
  const t = useT();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.toggle.locale}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur transition hover:bg-foreground hover:text-background"
    >
      <Languages className="size-3.5" />
      <span suppressHydrationWarning>{mounted ? (locale === "en" ? "ع" : "EN") : "ع"}</span>
    </button>
  );
}