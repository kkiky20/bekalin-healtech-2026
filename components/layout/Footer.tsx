import Link from "next/link";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-surface text-muted-foreground py-12 md:py-16 border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 lg:col-span-3">
            <Link href="/" className="flex items-center gap-3 group mb-6 inline-flex">
              <img 
                src="/logo-transparent.png" 
                alt="BEKALIN Logo" 
                className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
              <span className="font-black text-2xl tracking-tighter text-foreground">
                BEKALIN<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mt-4 text-sm leading-relaxed">
              Platform koordinasi dan distribusi logistik klinis untuk membantu rumah sakit mengelola supply chain secara lebih terintegrasi.
            </p>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-4">Produk</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#features" className="hover:text-primary transition-colors text-muted-foreground">Fitur Utama</Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-primary transition-colors text-muted-foreground">Cara Kerja</Link>
              </li>
              <li>
                <Link href="#benefits" className="hover:text-primary transition-colors text-muted-foreground">Manfaat</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#faq" className="hover:text-primary transition-colors text-muted-foreground">FAQ</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors text-muted-foreground">Kontak</Link>
              </li>
              <li className="pt-2">
                <Button variant="outline" className="border-border hover:bg-surface-secondary text-foreground h-9 w-full sm:w-auto">
                  Coba Demo
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© 2026 BEKALIN. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Prototype Kompetisi HealTech</p>
        </div>
      </div>
    </footer>
  );
}
