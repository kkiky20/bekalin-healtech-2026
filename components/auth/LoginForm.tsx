"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DemoAccountSelector } from "@/components/auth/DemoAccountSelector";
import { useAuthStore, Role, User } from "@/store/useAuthStore";

const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  password: z.string().min(1, "Password wajib diisi."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const DEMO_USERS: Record<Role, User & { email: string }> = {
  ADMIN_GUDANG: { id: "1", name: "Admin Gudang", email: "admin@bekalin.demo", role: "ADMIN_GUDANG", unit: "Gudang Utama" },
  ADMIN_CSSD: { id: "2", name: "Admin CSSD", email: "cssd@bekalin.demo", role: "ADMIN_CSSD", unit: "CSSD" },
  PERAWAT: { id: "3", name: "Perawat Unit", email: "perawat@bekalin.demo", role: "PERAWAT", unit: "IGD" },
  MANAJER: { id: "4", name: "Manajer Operasional", email: "manager@bekalin.demo", role: "MANAJER", unit: "Manajemen Rumah Sakit" },
};

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleDemoSelect = (role: Role) => {
    form.setValue("email", DEMO_USERS[role].email);
    form.setValue("password", "demo123");
    form.clearErrors();
    setErrorMsg("");
  };

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMsg("");
    
    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock Authentication Logic
    // IMPORTANT: This is for MVP demonstration only and must be replaced 
    // with actual backend authentication in the production phase.
    let authenticatedUser: User | null = null;

    if (data.password === "demo123") {
      const foundRole = Object.keys(DEMO_USERS).find(
        (key) => DEMO_USERS[key as Role].email === data.email
      ) as Role | undefined;

      if (foundRole) {
        authenticatedUser = DEMO_USERS[foundRole];
      }
    }

    if (authenticatedUser) {
      login(authenticatedUser);
      router.push("/dashboard");
    } else {
      setErrorMsg("Email atau password tidak sesuai.");
    }
  };

  return (
    <div className="w-full max-w-[440px] mx-auto flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-primary font-black text-sm">B</span>
          </div>
          <span className="font-bold tracking-tight">BEKALIN<span className="text-primary">.</span></span>
        </div>
        <h2 className="text-3xl font-black text-foreground mb-2 tracking-tight">Hallo! Selamat Datang</h2>
        <p className="text-muted-foreground font-medium">Masuk untuk melanjutkan ke dashboard BEKALIN</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {errorMsg && (
          <div className="p-3 text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/30 rounded-lg">
            {errorMsg}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="nama@email.com" 
            {...form.register("email")}
            className={form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {form.formState.errors.email && (
            <p className="text-xs font-semibold text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              {...form.register("password")}
              className={form.formState.errors.password ? "border-red-500 focus-visible:ring-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-xs font-semibold text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground">
              Ingat Saya
            </label>
          </div>
          <button 
            type="button" 
            onClick={() => alert("Fitur pemulihan password akan tersedia pada tahap implementasi authentication backend.")}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Lupa Password?
          </button>
        </div>

        <Button type="submit" className="w-full h-12 text-base font-bold mt-2 shadow-lg shadow-primary/20 hover:shadow-primary/30" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <DemoAccountSelector onSelect={handleDemoSelect} />
      
      <div className="mt-8 text-center">
        <Link href="/" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
          &larr; Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
