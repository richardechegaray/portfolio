import { notFound } from "next/navigation";
import { timelineEvents } from "@/data/timeline";
import { BackLink } from "@/components/ui/BackLink";

interface TimelineDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TimelineDetailPage({ params }: TimelineDetailPageProps) {
  const { id } = await params;
  const event = timelineEvents.find((e) => e.id === id);

  if (!event || !event.longDescription) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <BackLink
        href={`/#${id}`}
        className="text-sm text-accent-light hover:text-accent transition-colors"
      >
        &larr; Back to timeline
      </BackLink>

      {event.image && (
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
        {event.icon && <span className="mr-2">{event.icon}</span>}
        {event.title}
      </h1>

      <p className="mt-2 text-sm text-muted">{event.date}</p>

      <div className="mt-8 text-muted leading-relaxed whitespace-pre-line">
        {event.longDescription}
      </div>

      {event.images && event.images.length > 0 && (
        <div className="mt-8">
          <div className={event.images.length >= 3 ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-4"}>
            {event.images.map((img) => (
              <div
                key={img}
                className="overflow-hidden rounded-xl border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {event.videos && event.videos.length > 0 && (
        <div className="mt-8 space-y-4">
          {event.videos.map((vid) => (
            <video
              key={vid}
              src={vid}
              controls
              playsInline
              className="w-full rounded-xl border border-border"
            />
          ))}
        </div>
      )}
    </div>
  );
}
