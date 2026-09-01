import { Activity, ShieldCheck } from "lucide-react";

export function AuthBranding() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-1/2 bg-surface-secondary border-l border-border p-12 relative overflow-hidden group">
      
      {/* Background Image Effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
          alt="Healthcare Logistics" 
          className="w-full h-full object-cover opacity-[0.15] dark:opacity-[0.07] grayscale-[30%] transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Gradient overlay to blend perfectly with text */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-secondary via-surface-secondary/80 to-transparent dark:from-background dark:via-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-secondary via-surface-secondary/50 to-transparent dark:from-background dark:via-background/50" />
      </div>

      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl opacity-60 -mr-32 -mt-32 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl opacity-60 -ml-40 -mb-40 pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col gap-6 max-w-lg mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border w-fit shadow-sm">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold tracking-wide text-foreground uppercase">Secure Access</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight text-foreground drop-shadow-sm">
          Kelola Stok Kesehatan <br />
          <span className="text-primary">Lebih Cerdas & Terintegrasi</span>
        </h1>
        
        <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-md">
          Pantau persediaan, koordinasikan kebutuhan, dan optimalkan distribusi logistik klinis dalam satu sistem.
        </p>
      </div>

      <div className="relative z-10 mb-12">
        <div className="p-6 rounded-3xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl relative overflow-hidden flex flex-col gap-4 max-w-md">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <img src="/logo-transparent.png" alt="BEKALIN System" className="w-10 h-10 object-contain drop-shadow-sm" />
              <div>
                <div className="text-sm font-bold text-foreground">BEKALIN System</div>
                <div className="text-xs text-muted-foreground font-medium">Status: Active & Encrypted</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-2 w-3/4 bg-border/80 rounded-full"></div>
            <div className="h-2 w-1/2 bg-border/80 rounded-full"></div>
            <div className="h-2 w-full bg-border/80 rounded-full mt-2"></div>
            <div className="h-2 w-5/6 bg-border/80 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
