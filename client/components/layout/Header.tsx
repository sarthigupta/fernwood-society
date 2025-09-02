import { useAdmin } from "@/hooks/admin";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { admin, toggle } = useAdmin();
  const [open, setOpen] = useState(false);

  const NavLinks = (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
      <a
        href="#announcements"
        className="text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        Announcements
      </a>
      <a
        href="#amenities"
        className="text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        Amenities
      </a>
      <a
        href="#lost-found"
        className="text-sm font-medium text-foreground/80 hover:text-foreground"
      >
        Lost & Found
      </a>
      <button
        onClick={toggle}
        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors border ${admin ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground border-transparent hover:border-border"}`}
        aria-pressed={admin}
      >
        {admin ? "Admin: On" : "Admin: Off"}
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <div className="container flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-black">
            FS
          </span>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight text-base md:text-lg">
              Fernwood Society
            </div>
            <div className="text-xs text-foreground/60">
              Live better, together
            </div>
          </div>
        </a>

        <nav className="hidden md:block">{NavLinks}</nav>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-3">{NavLinks}</div>
        </div>
      )}
    </header>
  );
}
