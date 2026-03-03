import { Timeline } from "@/components/timeline/Timeline";
import { timelineEvents } from "@/data/timeline";
import { siteConfig } from "@/lib/constants";

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="mb-12">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Hey, I&apos;m {siteConfig.name.split(" ")[0]}{" "}
          <span className="wave">👋</span>
        </h1>
        <p className="mt-3 text-lg text-muted">{siteConfig.tagline}</p>
      </div>

      <Timeline events={timelineEvents} />
    </div>
  );
}
