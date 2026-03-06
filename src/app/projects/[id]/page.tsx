import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { BackLink } from "@/components/ui/BackLink";
import { Tag } from "@/components/ui/Tag";
import { Github, ExternalLink, FileText } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <BackLink
        href={`/projects#${id}`}
        className="text-sm text-accent-light hover:text-accent transition-colors"
      >
        &larr; Back to projects
      </BackLink>

      {project.image && (
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
        {project.title}
      </h1>

      {project.date && (
        <p className="mt-2 text-sm text-muted">{project.date}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <Github size={16} />
            <span>Code</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ExternalLink size={16} />
            <span>Link</span>
          </a>
        )}
        {project.pdfUrl && (
          <a
            href={project.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <FileText size={16} />
            <span>PDF</span>
          </a>
        )}
      </div>

      <div className="mt-8 text-muted leading-relaxed whitespace-pre-line">
        {project.longDescription || project.description}
      </div>

      {project.videos && project.videos.length > 0 && (
        <div className="mt-8">
          <div className="space-y-4">
            {project.videos.map((vid) => (
              <video
                key={vid}
                src={vid}
                controls
                className="w-full rounded-xl border border-border"
              />
            ))}
          </div>
          {project.videoCaption && (
            <p className="mt-2 text-center text-sm text-muted italic">
              {project.videoCaption}
            </p>
          )}
        </div>
      )}

      {project.images && project.images.length > 0 && (
        <div className="mt-8">
          <div className={project.images.length >= 3 ? "grid grid-cols-1 sm:grid-cols-3 gap-4" : "space-y-4"}>
            {project.images.map((img) => (
              <div
                key={img}
                className="overflow-hidden rounded-xl border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {project.imageCaption && (
            <p className="mt-2 text-center text-sm text-muted italic">
              {project.imageCaption}
            </p>
          )}
        </div>
      )}

      {project.pdfUrl && (
        <div className="mt-8">
          <iframe
            src={project.pdfUrl}
            className="w-full rounded-xl border border-border"
            style={{ height: "85vh" }}
            title={`${project.title} PDF`}
          />
        </div>
      )}
    </div>
  );
}