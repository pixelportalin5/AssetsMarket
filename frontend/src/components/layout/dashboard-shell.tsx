"use client";

import { Bell, Menu, Search } from "lucide-react";
import { type ReactNode, useState } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function DashboardShell({ children, title, description }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="glass-nav flex h-16 items-center gap-4 border-b border-white/10 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search assets, campaigns..." className="pl-9" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            {description && <p className="mt-1 text-muted-foreground">{description}</p>}
          </div>
          <div className={cn("animate-fade-in")}>{children}</div>
        </main>
      </div>
    </div>
  );
}
