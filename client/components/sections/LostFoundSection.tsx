import { useAdmin } from "@/hooks/admin";
import { CheckCircle2, CircleHelp, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

export interface LostFoundItem {
  id: string;
  type: "lost" | "found";
  title: string;
  description: string;
  contact: string;
  date: string; // ISO
  resolved?: boolean;
}

const STORAGE_KEY = "__society_lostfound__";

function useLostFound() {
  const [items, setItems] = useState<LostFoundItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
        return;
      } catch {}
    }
    const seed: LostFoundItem[] = [
      {
        id: crypto.randomUUID(),
        type: "lost",
        title: "Black wallet near Gate 2",
        description: "Contains PAN card and two membership cards. Reward on return.",
        contact: "+91 90909 90909",
        date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "found",
        title: "Keys with red keychain",
        description: "Found by the elevator in Block C, 3rd floor.",
        contact: "Drop at security desk",
        date: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
      },
    ];
    setItems(seed);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return { items, setItems };
}

export default function LostFoundSection() {
  const { admin } = useAdmin();
  const { items, setItems } = useLostFound();
  const [form, setForm] = useState({ type: "lost" as "lost" | "found", title: "", description: "", contact: "" });

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [items]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: LostFoundItem = {
      id: crypto.randomUUID(),
      type: form.type,
      title: form.title.trim(),
      description: form.description.trim(),
      contact: form.contact.trim(),
      date: new Date().toISOString(),
    };
    if (!payload.title || !payload.description || !payload.contact) return;
    setItems((prev) => [payload, ...prev]);
    setForm({ type: "lost", title: "", description: "", contact: "" });
  };

  const onDelete = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const markResolved = (id: string) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, resolved: true } : i)));

  return (
    <section id="lost-found" className="scroll-mt-24">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Lost & Found</h2>
            <p className="text-sm text-muted-foreground mt-1">Report lost or found items to help neighbors reunite with belongings.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3 rounded-xl border border-border bg-card p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm">Type
              <select
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as "lost" | "found" }))}
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </label>
            <label className="text-sm">Title
              <input
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g., Blue backpack near Block B"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </label>
          </div>
          <label className="text-sm">Description
            <textarea
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-24"
              placeholder="Add distinguishing details"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </label>
          <label className="text-sm">Contact
            <input
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Phone or instructions (e.g., drop at security)"
              value={form.contact}
              onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
            />
          </label>
          <div className="flex items-center justify-end">
            <button type="submit" className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground">Submit</button>
          </div>
        </form>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((i) => (
            <div key={i.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {i.type === "lost" ? (
                    <CircleHelp className="h-5 w-5 text-destructive" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  <div className="font-semibold">{i.title}</div>
                </div>
                {admin && (
                  <div className="flex items-center gap-2">
                    {!i.resolved && (
                      <button
                        className="rounded-md border border-border px-2 py-1 text-xs hover:bg-secondary"
                        onClick={() => markResolved(i.id)}
                      >
                        Mark resolved
                      </button>
                    )}
                    <button
                      className="rounded-md border border-destructive text-destructive p-2 hover:bg-destructive/10"
                      onClick={() => onDelete(i.id)}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-foreground/90">{i.description}</p>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium">Contact:</span> {i.contact}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">{new Date(i.date).toLocaleString()}</div>
              {i.resolved && <div className="mt-2 inline-flex rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">Resolved</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
