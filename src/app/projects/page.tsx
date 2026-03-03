import { PageHeader } from "@/components/ui/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <PageHeader
        title="Projects"
        description="Things I've built and contributed to."
      />

      {featured.length > 0 && (
        <div className="mt-8 space-y-6">
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} featured />
            </ScrollReveal>
          ))}
        </div>
      )}

      {other.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {other.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
