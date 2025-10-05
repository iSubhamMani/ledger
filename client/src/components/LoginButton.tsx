"use client";

import React from "react";
import { Button } from "./ui/button";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const LoginButton = () => {
  function googleLogin() {
    window.location.href = `http://localhost:8000/auth/google`;
  }

  return (
    <Button
      onClick={googleLogin}
      size={"lg"}
      className="shadow-sm group py-6 font-medium flex items-center bg-orange-300 hover:bg-orange-400 text-black rounded-full cursor-pointer"
    >
      <span className="text-sm">Start Tracking</span>
      <RiMoneyRupeeCircleFill className="size-5 group-hover:scale-110 transition-transform duration-200" />
    </Button>
  );
};

export default LoginButton;
