"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { AdminGudangDashboard } from "@/components/dashboard/roles/AdminGudangDashboard";
import { AdminCssdDashboard } from "@/components/dashboard/roles/AdminCssdDashboard";
import { PerawatDashboard } from "@/components/dashboard/roles/PerawatDashboard";
import { ManajerDashboard } from "@/components/dashboard/roles/ManajerDashboard";

export default function DashboardPage() {
  const { user } = useAuthStore();

  const renderDashboard = () => {
    switch (user?.role) {
      case "ADMIN_GUDANG":
        return <AdminGudangDashboard />;
      case "ADMIN_CSSD":
        return <AdminCssdDashboard />;
      case "PERAWAT":
        return <PerawatDashboard />;
      case "MANAJER":
        return <ManajerDashboard />;
      default:
        return null;
    }
  };

  return (
    <RoleGuard allowedRoles={["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"]}>
      {renderDashboard()}
    </RoleGuard>
  );
}
