import { Baby, BedDouble, Bike, Building2, Car, Leaf, ShieldCheck, Sun, Trees, Users } from "lucide-react";

const amenities = [
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    desc: "CCTV surveillance, access control, and trained security staff for peace of mind.",
  },
  { icon: Leaf, title: "Green Park", desc: "Lush central lawn with walking track and shaded seating." },
  { icon: Users, title: "Clubhouse", desc: "Multipurpose hall, indoor games, and co-working lounge." },
  { icon: Baby, title: "Kids Play Area", desc: "Safe, soft-fall playground equipment for all ages." },
  { icon: Sun, title: "Solar Power", desc: "Common areas powered by rooftop solar to cut emissions." },
  { icon: Trees, title: "Rainwater Harvesting", desc: "Smart harvesting and reuse for a sustainable footprint." },
  { icon: Bike, title: "Fitness Studio", desc: "Airy studio for yoga, Zumba, and functional training." },
  { icon: Car, title: "Visitor Parking", desc: "Ample and clearly marked parking for guests." },
  { icon: Building2, title: "Community Store", desc: "Everyday essentials at the convenience store inside." },
  { icon: BedDouble, title: "Guest Suites", desc: "Comfortable, bookable guest rooms for your visitors." },
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="scroll-mt-24">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Amenities</h2>
        <p className="text-sm text-muted-foreground mt-1">Thoughtfully designed spaces that make everyday life better.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {amenities.map((a) => (
            <div key={a.title} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{a.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
