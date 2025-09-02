import AnnouncementsSection from "@/components/sections/AnnouncementsSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import LostFoundSection from "@/components/sections/LostFoundSection";

export default function Index() {
  return (
    <main id="top">
      <Hero />
      <div className="space-y-20">
        <AnnouncementsSection />
        <AmenitiesSection />
        <LostFoundSection />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-emerald-900/20 dark:to-emerald-800/10">
      <div className="container grid gap-8 py-16 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
            Fernwood Society
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-[967px]">
            A modern residential community fostering sustainable living and
            strong neighborly bonds. Stay updated with announcements, explore
            amenities, and help with lost & found.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#announcements"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
            >
              See announcements
            </a>
            <a
              href="#amenities"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Explore amenities
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 bg-gradient-to-tr from-primary/10 to-transparent blur-2xl" />
        </div>
      </div>
    </section>
  );
}
