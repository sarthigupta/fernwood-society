export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/40">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="font-extrabold text-lg">Fernwood Society</div>
          <p className="mt-2 text-sm text-muted-foreground">
            A vibrant, eco-friendly residential community with modern amenities
            and neighborly spirit.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Office: Block A, Ground Floor</li>
            <li>Email: office@fernwood.community</li>
            <li>Phone: +91 98765 43210</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Quick links</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              <a className="hover:text-foreground" href="#announcements">
                Announcements
              </a>
            </li>
            <li>
              <a className="hover:text-foreground" href="#amenities">
                Amenities
              </a>
            </li>
            <li>
              <a className="hover:text-foreground" href="#lost-found">
                Lost &amp; Found
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Fernwood Society. All rights reserved.
      </div>
    </footer>
  );
}
