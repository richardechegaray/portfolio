import { PageHeader } from "@/components/ui/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { BackLink } from "@/components/ui/BackLink";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <BackLink
        href="/#explore"
        className="mb-6 inline-block text-sm text-muted hover:text-accent-light transition-colors"
      >
        &larr; Back to main
      </BackLink>
      <PageHeader
        title="Projects"
        description="Things I've built and contributed to. Click on a project to learn more"
      />

      <div className="mt-8 space-y-6">
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1}>
            <div id={project.id}>
              <ProjectCard project={project} />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}