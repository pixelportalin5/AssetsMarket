import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">AssetsMarket</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The marketplace for digital advertising assets. Connect sellers and advertisers with
              verified inventory, transparent pricing, and escrow-protected transactions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/marketplace" className="hover:text-foreground">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Account</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/login" className="hover:text-foreground">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-foreground">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AssetsMarket. Visual shell — mock data only.
        </div>
      </div>
    </footer>
  );
}
