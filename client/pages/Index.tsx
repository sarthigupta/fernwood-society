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
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="aspect-[16/10] bg-gradient-to-br from-emerald-200/30 to-emerald-600/20 flex items-center justify-center">
              <svg
                viewBox="0 0 400 250"
                className="w-[85%] max-w-[440px] text-emerald-800/80"
              >
                <defs>
                  <linearGradient id="roof" x1="0" x2="1" y1="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity="0.9"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity="0.6"
                    />
                  </linearGradient>
                </defs>
                <rect
                  x="0"
                  y="180"
                  width="400"
                  height="70"
                  fill="rgba(16,24,40,0.04)"
                />
                <circle cx="330" cy="50" r="22" fill="rgba(234,179,8,0.35)" />
                <g>
                  <polygon points="200,60 110,120 290,120" fill="url(#roof)" />
                  <rect
                    x="130"
                    y="120"
                    width="140"
                    height="90"
                    rx="6"
                    fill="white"
                    stroke="currentColor"
                    strokeOpacity="0.15"
                  />
                  <rect
                    x="185"
                    y="150"
                    width="30"
                    height="60"
                    rx="3"
                    fill="hsl(var(--primary))"
                  />
                  <rect
                    x="145"
                    y="135"
                    width="24"
                    height="22"
                    fill="rgba(16,24,40,0.06)"
                  />
                  <rect
                    x="231"
                    y="135"
                    width="24"
                    height="22"
                    fill="rgba(16,24,40,0.06)"
                  />
                </g>
                <g>
                  <rect
                    x="85"
                    y="165"
                    width="14"
                    height="25"
                    fill="rgba(16,24,40,0.18)"
                  />
                  <circle cx="92" cy="155" r="14" fill="rgba(16,24,40,0.12)" />
                  <rect
                    x="305"
                    y="165"
                    width="14"
                    height="25"
                    fill="rgba(16,24,40,0.18)"
                  />
                  <circle cx="312" cy="150" r="18" fill="rgba(16,24,40,0.12)" />
                </g>
                <path
                  d="M40 210 H360"
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
