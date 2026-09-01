import { Role } from "@/store/useAuthStore";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  ClipboardCheck, 
  ArrowLeftRight, 
  Truck, 
  ChartNoAxesCombined,
  Bell,
  UserCircle
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  allowedRoles: Role[];
}

export const navigationConfig: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"],
  },
  {
    label: "Monitoring Stok",
    href: "/monitoring-stok",
    icon: Package,
    allowedRoles: ["ADMIN_GUDANG", "ADMIN_CSSD", "MANAJER"],
  },
  {
    label: "Permintaan Logistik",
    href: "/permintaan",
    icon: ClipboardList,
    allowedRoles: ["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT"],
  },
  {
    label: "Persetujuan Permintaan",
    href: "/persetujuan",
    icon: ClipboardCheck,
    allowedRoles: ["ADMIN_GUDANG"],
  },
  {
    label: "Redistribusi Stok",
    href: "/redistribusi",
    icon: ArrowLeftRight,
    allowedRoles: ["ADMIN_GUDANG"],
  },
  {
    label: "Tracking Distribusi",
    href: "/tracking",
    icon: Truck,
    allowedRoles: ["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"],
  },
  {
    label: "Dashboard Manajemen",
    href: "/manajemen",
    icon: ChartNoAxesCombined,
    allowedRoles: ["MANAJER"],
  },
];

export const secondaryNavigationConfig: NavigationItem[] = [
  {
    label: "Notifikasi",
    href: "/notifikasi",
    icon: Bell,
    allowedRoles: ["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"],
  },
  {
    label: "Profil",
    href: "/profil",
    icon: UserCircle,
    allowedRoles: ["ADMIN_GUDANG", "ADMIN_CSSD", "PERAWAT", "MANAJER"],
  },
];
