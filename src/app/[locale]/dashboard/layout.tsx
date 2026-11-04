import type { ReactNode } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getCurrentUser, getProperty } from "@/lib/dal";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, property] = await Promise.all([getCurrentUser(), getProperty()]);

  return (
    <DashboardShell
      user={{
        name: user.name,
        initials: user.initials,
        location: user.location,
      }}
      property={{
        name: property.name,
        city: property.city,
      }}
    >
      {children}
    </DashboardShell>
  );
}
