"use client";

import { Nav } from "@/components/Nav";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  categories,
  categoryIcon,
  paymentIcon,
  paymentMethods,
} from "@/utils/categories";
import { Calendar, Check, Delete } from "lucide-react";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const AddPage = () => {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState<string>("0");
  const [category, setCategory] = useState<string>(categories[0]);
  const [method, setMethod] = useState<string>(paymentMethods[0]);

  const handleNumberClick = (num: string) => {
    setAmount((prev) => {
      if (prev === "0") return num;
      // Limit to 2 decimal places
      const parts = prev.split(".");
      if (parts.length === 2 && parts[1].length >= 2) return prev;
      return prev + num;
    });
  };

  const handleDecimal = () => {
    if (!amount.includes(".")) {
      setAmount((prev) => prev + ".");
    }
  };

  const handleDelete = () => {
    setAmount((prev) => {
      if (prev.length === 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const handleSubmit = () => {
    const value = Number.parseFloat(amount);
    if (!value || value <= 0) return;
    // add transaction logic here
    // Reset form
    setAmount("0");
    setCategory(categories[0]);
    setMethod(paymentMethods[0]);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col space-y-4">
      <div className="pt-4 px-4">
        <p className="uppercase text-center text-xs text-[#666666] font-medium mb-2">
          This month
        </p>

        <div className="flex justify-center items-center gap-4">
          <div className="flex flex-col items-center">
            <p className="uppercase text-xs sm:text-sm md:text-base text-green-600 font-medium">
              EARNED
            </p>
            <h3 className="flex items-center font-semibold text-sm sm:text-base">
              <MdOutlineCurrencyRupee className="inline" /> 3340.00
            </h3>
          </div>

          <div className="flex flex-col items-center border-l-2 border-gray-300 pl-4">
            <p className="uppercase text-xs sm:text-sm md:text-base text-red-500 font-medium">
              SPENT
            </p>
            <h3 className="flex items-center font-semibold text-sm sm:text-base">
              <MdOutlineCurrencyRupee className="inline" /> 1234.00
            </h3>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="h-full flex flex-col w-full max-w-lg overflow-hidden border-2 rounded-t-4xl">
          <div className="flex flex-col flex-1 gap-4 p-4 md:p-6">
            <div className="space-y-2 sm:space-y-3">
              {/* Category and Method Selectors */}
              <div className="flex gap-2">
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="text-xs sm:text-sm h-10 flex-1 rounded-full bg-blue-100 text-black font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((m) => {
                      const Icon = paymentIcon(m);
                      return (
                        <SelectItem key={m} value={m}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-black" />
                            {m}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="text-xs sm:text-sm h-10 flex-1 rounded-full bg-green-100 text-black font-medium">
                    <div className="flex items-center gap-2">
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => {
                      const Icon = categoryIcon(c);
                      return (
                        <SelectItem key={c} value={c}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-black" />
                            {c}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              {/* Type Toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("expense")}
                  className={`cursor-pointer flex-1 rounded-full py-2 text-black text-xs sm:text-sm font-medium transition-colors ${
                    type === "expense"
                      ? "bg-orange-300"
                      : "bg-muted hover:bg-orange-100/80"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setType("income")}
                  className={`cursor-pointer flex-1 rounded-full py-2 text-black text-xs sm:text-sm  font-medium transition-colors ${
                    type === "income"
                      ? "bg-orange-300"
                      : "bg-muted hover:bg-orange-100/80"
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            {/* Amount Display */}
            <div className="py-3 sm:py-4 md:py-6">
              <div className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold tabular-nums tracking-tight">
                <p className="flex justify-center items-center">
                  <MdOutlineCurrencyRupee className="size-5 sm:size-6 md:size-7 text-[#535353]" />
                  <span>{amount}</span>
                </p>
              </div>
              <div className="text-center mt-2">
                <input
                  type="text"
                  className="w-full text-sm sm:text-base font-medium text-[#434343] placeholder:text-center text-center focus:outline-none"
                  placeholder="Add comment..."
                />
              </div>
            </div>

            {/* Custom Numpad */}
            <div className="flex flex-1">
              <div className="w-3/4 grid grid-cols-3 gap-2 rounded-2xl p-3 md:gap-3 md:p-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleNumberClick(num.toString())}
                    className=" bg-gray-100 rounded-full text-xl sm:text-2xl font-semibold text-foreground transition-colors hover:bg-muted active:scale-95 md:text-2xl"
                  >
                    {num}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleDecimal}
                  className="rounded-full bg-background text-2xl font-semibold text-foreground transition-colors hover:bg-muted active:scale-95 md:text-3xl"
                >
                  .
                </button>

                {/* Zero */}
                <button
                  type="button"
                  onClick={() => handleNumberClick("0")}
                  className="rounded-full bg-background text-2xl font-semibold text-foreground transition-colors hover:bg-muted active:scale-95 md:text-3xl"
                >
                  0
                </button>
              </div>
              <div className="w-1/4 grid grid-cols-2 gap-2 rounded-2xl pr-3 py-3 md:gap-3 ">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="active:scale-95 bg-red-200 rounded-2xl p-3 md:p-4 col-span-2"
                >
                  <Delete className="mx-auto size-4 sm:size-5 md:size-6" />
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="active:scale-95 bg-gray-100 rounded-2xl p-3 md:p-4 col-span-2"
                >
                  <Calendar className="mx-auto size-4 sm:size-5 md:size-6" />
                </button>
                {/* Submit button - spans half width (default in a grid-cols-2 setup) */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="active:scale-95 bg-black text-white rounded-2xl p-3 md:p-4 col-span-2 row-span-4 flex items-center justify-center"
                >
                  <Check
                    className="size-4 sm:size-5 md:size-6"
                    strokeWidth={3}
                  />
                </button>
              </div>
            </div>
          </div>
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default AddPage;
