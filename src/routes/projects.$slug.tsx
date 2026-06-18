import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useT } from "@/i18n/useT";
import { en } from "@/i18n/dictionaries";
import { FONTS, COLORS, BORDERS } from "@/styles/theme";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const exists = en.projects.items.some((p) => p.slug === params.slug);
    if (!exists) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const project = en.projects.items.find((p) => p.slug === params.slug);
    const title = project
      ? `${project.name} — Mostafa Samir`
      : "Project — Mostafa Samir";
    const description = project?.summary ?? "A selected project by Mostafa Samir.";
    const url = `/projects/${params.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: "/MS.jpg" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "/MS.jpg" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: project
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: project.name,
                description: project.summary,
                dateCreated: project.year,
                creator: {
                  "@type": "Person",
                  name: "Mostafa Samir",
                  url: "/",
                },
              }),
            },
          ]
        : [],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center">
      <p className={`${FONTS.bodySm} ${COLORS.textMuted}`}>Project not found.</p>
    </div>
  ),
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const t = useT();
  const project = t.projects.items.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6">
        <p className={`${FONTS.bodySm} ${COLORS.textMuted}`}>{t.project.notFound}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <article className="mx-auto max-w-5xl px-6 pt-40 pb-24 md:px-10">
        <Link
          to="/"
          hash="projects"
          className={`inline-flex items-center gap-2 ${FONTS.labelXs} ${COLORS.textMuted} transition hover:${COLORS.textBase}`}
        >
          <ArrowLeft className="size-3.5 rtl:rotate-180" />
          {t.project.back}
        </Link>

        <p className={`mt-10 ${FONTS.labelXs} ${COLORS.textMuted}`}>
          {project.category}
        </p>

        <h1 className={`mt-4 ${FONTS.displayXl} leading-[0.95] tracking-tight`}>
          {project.name}
        </h1>

        <p className={`mt-8 max-w-2xl ${FONTS.bodyLg} ${COLORS.textMuted}`}>
          {project.summary}
        </p>

        <dl
          className={`mt-16 grid grid-cols-1 gap-px overflow-hidden ${BORDERS.rounded2xl} border border-border md:grid-cols-3`}
        >
          <Meta label={t.project.year} value={project.year} />
          <Meta label={t.project.role} value={project.role} />
          <Meta label={t.project.category} value={project.category} />
        </dl>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3" />
          <p className={`${FONTS.bodyLg} text-foreground/90 md:col-span-9`}>
            {project.body}
          </p>
        </div>

        <div className="mt-20 aspect-[16/9] rounded-2xl border border-border bg-card" />
      </article>
      <Footer />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-6">
      <dt className={`${FONTS.labelXs} ${COLORS.textMuted}`}>{label}</dt>
      <dd className={`mt-2 ${FONTS.displaySm}`}>{value}</dd>
    </div>
  );
}
