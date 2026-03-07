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
            loading="lazy"
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
            {project.videos.map((vid) => {
              const ytMatch = vid.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
              return ytMatch ? (
                <div key={vid} className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                    className="w-full h-full rounded-xl border border-border"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video
                  key={vid}
                  src={vid}
                  controls
                  playsInline
                  preload="metadata"
                  poster={project.videoPoster || project.image}
                  className="w-full rounded-xl border border-border"
                />
              );
            })}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.images.map((img, i) => (
              <div
                key={img}
                className={`overflow-hidden rounded-xl border border-border${
                  project.images!.length % 2 === 1 && i === project.images!.length - 1
                    ? " sm:col-span-2"
                    : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={project.title}
                  loading="lazy"
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
          {/* Desktop: embedded PDF */}
          <iframe
            src={project.pdfUrl}
            className="hidden md:block w-full rounded-xl border border-border"
            style={{ height: "85vh" }}
            title={`${project.title} PDF`}
          />
          {/* Mobile: download link */}
          <a
            href={project.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex md:hidden items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 px-5 py-4 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            <FileText size={18} />
            <span>View PDF</span>
          </a>
        </div>
      )}
    </div>
  );
}