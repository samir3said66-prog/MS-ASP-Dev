import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

const TITLE = "Mostafa Samir — Full-Stack .NET & React Developer";
const DESCRIPTION =
  "Full-Stack Software Developer with 4+ years building secure, scalable .NET 8 and React/TypeScript applications. Based in Tanta, Egypt — working globally.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // Open Graph
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/MS.jpg" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/MS.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mostafa Samir",
          jobTitle: "Full-Stack Software Developer",
          description: DESCRIPTION,
          url: "/",
          email: "m.ssaid356@gmail.com",
          telephone: "+201067358073",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tanta",
            addressCountry: "EG",
          },
          knowsAbout: [
            ".NET 8",
            "ASP.NET Core",
            "C#",
            "React",
            "TypeScript",
            "SQL Server",
            "Microservices",
          ],
          sameAs: [
            "https://github.com/Mostafa-SAID7",
            "https://www.linkedin.com/in/mostafasamirsaid",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
