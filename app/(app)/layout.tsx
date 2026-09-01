import { AppShell } from "@/components/layout/AppShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | BEKALIN",
  description: "Internal Application for BEKALIN",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
