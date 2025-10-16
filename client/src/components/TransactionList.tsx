"use client";

import { callApi } from "@/utils/callApi";
import { categoryIcon } from "@/utils/categories";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { MdOutlineCurrencyRupee } from "react-icons/md";

export interface Transaction {
  id: number;
  txn_mode: string;
  category: string;
  txn_type: string;
  amount: number;
  txn_date: string;
  comment?: string;
}

const iconColorMap: Record<string, string> = {
  Shopping: "bg-orange-200 text-black",
  Food: "bg-yellow-200 text-black",
  Home: "bg-blue-200 text-black",
  Transport: "bg-green-200 text-black",
  Health: "bg-red-200 text-black",
  Gifts: "bg-pink-200 text-black",
  Savings: "bg-purple-200 text-black",
  Salary: "bg-teal-200 text-black",
  Other: "bg-gray-200 text-black",
};

const useRecentTransactions = () => {
  return useQuery({
    queryKey: ["recentTransactions"],
    queryFn: async () => {
      const res = await callApi.get("/transaction/recent");
      return res.data as Transaction[];
    },
    staleTime: 10 * 60 * 1000,
  });
};

const TransactionsList = () => {
  const { data: transactions = [] } = useRecentTransactions();

  return (
    <div className="py-4 md:px-4 space-y-3 container mx-auto mb-16 md:mb-20">
      {transactions?.map((transaction) => {
        const Icon = categoryIcon(transaction.category);
        const iconColor =
          iconColorMap[transaction.category] || "bg-muted text-foreground";

        const txnType = transaction.txn_type;

        return (
          <div key={transaction.id} className="px-4 py-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-full ${iconColor}`}>
                  <Icon className="size-4 md:size-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-sm sm:text-base text-[#333333]">
                    {transaction.category}
                  </p>

                  {transaction.comment && (
                    <p className="text-xs sm:text-sm text-[#666666] overflow-hidden text-ellipsis max-w-xs">
                      {transaction.comment}
                    </p>
                  )}
                  <p className="flex items-center gap-1 text-xs sm:text-sm text-[#666]">
                    <span>
                      <Calendar className="size-2.5 sm:size-3" />
                    </span>
                    {new Date(transaction.txn_date).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <p
                  className={`font-bold flex items-center text-xs sm:text-sm md:text-base ${
                    txnType === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {txnType === "income" ? "+" : "-"}
                  <MdOutlineCurrencyRupee className="inline size-3 sm:size-4" />
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-xs sm:text-sm text-[#666666]">
                  {transaction.txn_mode}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsList;
