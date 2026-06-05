import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 shadow-glow">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <span className="text-xl font-semibold">
          Assets<span className="text-gradient">Market</span>
        </span>
      </Link>
      <div className="w-full max-w-md animate-fade-in">{children}</div>
    </div>
  );
}
