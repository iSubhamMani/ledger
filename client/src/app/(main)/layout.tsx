"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiLogoutCircleRLine } from "react-icons/ri";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="z-50 cursor-pointer absolute top-3 right-3 sm:top-5 sm:right-5 md:top-7 md:right-7"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs sm:text-sm">
            Subham Mani
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-xs sm:text-sm">
            <RiLogoutCircleRLine className="size-4 sm:size-5" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {children}
    </main>
  );
};

export default MainLayout;
