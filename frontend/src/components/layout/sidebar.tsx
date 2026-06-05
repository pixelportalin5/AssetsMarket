"use client";

import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Package,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { sidebarNavItems } from "@/data/mock";
import { cn } from "@/lib/utils";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  package: Package,
  megaphone: Megaphone,
  calendar: Calendar,
  "message-square": MessageSquare,
  "credit-card": CreditCard,
  settings: Settings,
} as const;

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "glass flex h-full flex-col border-r border-white/10",
        collapsed ? "w-[72px]" : "w-64",
      )}
    >
      <div className={cn("flex items-center gap-2 p-4", collapsed && "justify-center")}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold">AssetsMarket</p>
            <p className="text-xs text-muted-foreground">Seller Dashboard</p>
          </div>
        )}
      </div>

      <Separator />

      <nav className="flex-1 space-y-1 p-3">
        {sidebarNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className={cn("p-4", collapsed && "flex justify-center")}>
        <div className={cn("flex items-center gap-3", collapsed && "flex-col")}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Jane Doe</p>
              <Badge variant="secondary" className="mt-1">
                Pro Seller
              </Badge>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
