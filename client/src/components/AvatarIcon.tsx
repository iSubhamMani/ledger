"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { RiLogoutCircleRLine } from "react-icons/ri";

const AvatarIcon = () => {
  const { data: userInfo } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="z-50 cursor-pointer absolute top-3 right-3 sm:top-5 sm:right-5 md:top-7 md:right-7"
      >
        <Avatar>
          <AvatarImage src={userInfo?.photo} />
          <AvatarFallback>
            {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-xs sm:text-sm">
          {userInfo?.name || "Unable to fetch name"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-xs sm:text-sm">
          <RiLogoutCircleRLine className="size-4 sm:size-5" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarIcon;
