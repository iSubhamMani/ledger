"use client";

import AvatarIcon from "@/components/AvatarIcon";
import { ReactNode } from "react";
import { Providers } from "../Providers";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Providers>
        <AvatarIcon />
        {children}
      </Providers>
    </main>
  );
};

export default MainLayout;
