"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import React from "react";

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  "monitoring-stok": "Monitoring Stok",
  permintaan: "Permintaan Logistik",
  persetujuan: "Persetujuan",
  redistribusi: "Redistribusi",
  tracking: "Tracking Distribusi",
  manajemen: "Dashboard Manajemen",
  notifikasi: "Notifikasi",
  profil: "Profil Pengguna",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Split path and filter out empty strings
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 hidden md:flex items-center text-sm">
      <ol className="flex items-center gap-2">
        <li>
          <Link 
            href="/dashboard" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = ROUTE_LABELS[segment] || segment.replace(/-/g, " ");

          return (
            <React.Fragment key={href}>
              <li className="text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li>
                {isLast ? (
                  <span className="font-semibold text-foreground capitalize" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link 
                    href={href} 
                    className="text-muted-foreground hover:text-foreground transition-colors capitalize"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
