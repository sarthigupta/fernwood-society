import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AdminContextValue {
  admin: boolean;
  setAdmin: (v: boolean) => void;
  toggle: () => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("__society_admin__");
    if (saved) setAdmin(saved === "1");
  }, []);

  useEffect(() => {
    localStorage.setItem("__society_admin__", admin ? "1" : "0");
  }, [admin]);

  const value = useMemo(
    () => ({ admin, setAdmin, toggle: () => setAdmin((v) => !v) }),
    [admin],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
