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
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {clips.map((clip, i) => (
          <ScrollReveal key={clip.id} delay={i * 0.1}>
            <ClipCard clip={clip} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
