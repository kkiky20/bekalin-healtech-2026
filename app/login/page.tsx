import { Metadata } from "next";
import { AuthBranding } from "@/components/auth/AuthBranding";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | BEKALIN",
  description: "Masuk ke dashboard BEKALIN",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex bg-background">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-12 relative overflow-y-auto">
        <LoginForm />
      </div>

      {/* Right Panel - Branding (Hidden on mobile) */}
      <AuthBranding />
    </main>
  );
}
