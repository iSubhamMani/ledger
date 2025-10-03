"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { FaChartPie } from "react-icons/fa";

import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/add",
      label: "Add Transaction",
      icon: Plus,
      isActive: pathname === "/add",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: FaChartPie,
      isActive: pathname === "/dashboard",
    },
  ];

  return (
    <nav className="max-w-fit mx-auto w-full mb-4">
      <div className="flex items-center gap-2 rounded-full border bg-background/95 px-3 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground font-medium",
                item.isActive
                  ? "bg-orange-300 text-black hover:bg-orange-400"
                  : "text-[#333333]"
              )}
            >
              <Icon className="size-4 sm:size-5" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
