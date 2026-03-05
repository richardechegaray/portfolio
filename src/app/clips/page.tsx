import { PageHeader } from "@/components/ui/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ClipCard } from "@/components/clips/ClipCard";
import { clips } from "@/data/clips";

export default function ClipsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <PageHeader
        title="Clips"
        description="Highlights from volleyball, concerts, hangouts with friends, etc."
      />
      <h3 className="mt-10 font-display text-xl font-bold text-foreground md:text-2xl">
        Volleyball
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {clips.filter((c) => c.tags?.includes("volleyball")).map((clip, i) => (
          <ScrollReveal key={clip.id} delay={i * 0.1}>
            <ClipCard clip={clip} />
          </ScrollReveal>
        ))}
      </div>

      <h3 className="mt-10 font-display text-xl font-bold text-foreground md:text-2xl">
        Gaming
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {clips.filter((c) => c.tags?.includes("gaming")).map((clip, i) => (
          <ScrollReveal key={clip.id} delay={i * 0.1}>
            <ClipCard clip={clip} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
