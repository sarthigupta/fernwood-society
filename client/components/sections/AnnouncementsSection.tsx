import { useAdmin } from "@/hooks/admin";
import { Pencil, Plus, Trash2, Pin } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string; // ISO
  pinned?: boolean;
}

const STORAGE_KEY = "__society_announcements__";

function useAnnouncements() {
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
        return;
      } catch {}
    }
    const seed: Announcement[] = [
      {
        id: crypto.randomUUID(),
        title: "Monsoon Preparedness Drive",
        body: "Basement pump maintenance on Saturday, 10 AM. Keep vehicles in designated spots.",
        date: new Date().toISOString(),
        pinned: true,
      },
      {
        id: crypto.randomUUID(),
        title: "Yoga Morning Club",
        body: "Join daily 6:30 AM at Central Lawn. All levels welcome. Bring your mat!",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      },
    ];
    setItems(seed);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  return { items, setItems };
}

export default function AnnouncementsSection() {
  const { admin } = useAdmin();
  const { items, setItems } = useAnnouncements();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", body: "", pinned: false });

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      if ((b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) !== 0) {
        return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [items]);

  const resetForm = () => setForm({ title: "", body: "", pinned: false });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: Announcement = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      body: form.body.trim(),
      date: new Date().toISOString(),
      pinned: form.pinned,
    };
    if (!payload.title || !payload.body) return;
    setItems((prev) => [payload, ...prev]);
    resetForm();
  };

  const onDelete = (id: string) =>
    setItems((prev) => prev.filter((a) => a.id !== id));

  const onEditSave = (id: string, next: Partial<Announcement>) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, ...next } : a)));
    setEditing(null);
  };

  return (
    <section id="announcements" className="scroll-mt-24">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Announcements
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Stay informed with the latest updates from the management
              committee.
            </p>
          </div>
          {admin && (
            <details className="w-full md:w-auto group">
              <summary className="list-none inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold hover:bg-card/60 cursor-pointer">
                <Plus className="h-4 w-4" /> New
              </summary>
              <form
                onSubmit={onSubmit}
                className="mt-3 grid gap-3 rounded-lg border border-border bg-card p-3 md:absolute md:right-0 md:mt-2 md:w-[28rem]"
              >
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
                <textarea
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-24"
                  placeholder="Write announcement details..."
                  value={form.body}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, body: e.target.value }))
                  }
                />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.pinned}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, pinned: e.target.checked }))
                    }
                  />
                  Pin to top
                </label>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-3 py-2 text-sm rounded-md border border-border"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground"
                  >
                    Post
                  </button>
                </div>
              </form>
            </details>
          )}
        </div>

        <div className="mt-6 grid gap-4">
          {sorted.map((a) => (
            <article
              key={a.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {a.pinned && (
                      <span
                        title="Pinned"
                        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary"
                      >
                        <Pin className="h-3 w-3" /> Pinned
                      </span>
                    )}
                    <h3 className="text-lg font-bold leading-snug">
                      {a.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(a.date).toLocaleString()}
                  </p>
                </div>
                {admin && (
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-md border border-border p-2 hover:bg-secondary"
                      onClick={() => setEditing(a.id)}
                      aria-label="Edit announcement"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-md border border-destructive text-destructive p-2 hover:bg-destructive/10"
                      onClick={() => onDelete(a.id)}
                      aria-label="Delete announcement"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {editing === a.id ? (
                <EditForm
                  initial={a}
                  onCancel={() => setEditing(null)}
                  onSave={(next) => onEditSave(a.id, next)}
                />
              ) : (
                <p className="mt-3 leading-relaxed text-foreground/90">
                  {a.body}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Announcement;
  onSave: (next: Partial<Announcement>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [body, setBody] = useState(initial.body);
  const [pinned, setPinned] = useState(Boolean(initial.pinned));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title: title.trim(), body: body.trim(), pinned });
      }}
      className="mt-3 grid gap-3"
    >
      <input
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-24"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={pinned}
          onChange={(e) => setPinned(e.target.checked)}
        />{" "}
        Pin to top
      </label>
      <div className="flex items-center gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 text-sm rounded-md border border-border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground"
        >
          Save
        </button>
      </div>
    </form>
  );
}
