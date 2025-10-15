import {
  ShoppingBag,
  Gift,
  Utensils,
  Home,
  Car,
  Smartphone,
} from "lucide-react";

export interface Transaction {
  id: string;
  category: string;
  icon: string;
  paymentMethod: string;
  amount: number;
  percentage: number;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const iconMap: Record<string, typeof ShoppingBag> = {
  shopping: ShoppingBag,
  gifts: Gift,
  food: Utensils,
  home: Home,
  transport: Car,
  tech: Smartphone,
};

const iconColorMap: Record<string, string> = {
  shopping: "bg-orange-200 text-black",
  food: "bg-yellow-200 text-black",
  home: "bg-blue-200 text-black",
  transport: "bg-green-200 text-black",
  health: "bg-red-200 text-black",
  gifts: "bg-pink-200 text-black",
  savings: "bg-purple-200 text-black",
  salary: "bg-teal-200 text-black",
  other: "bg-gray-200 text-black",
};

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <div className="py-4 md:px-4 space-y-3 container mx-auto mb-16 md:mb-20">
      {transactions.map((transaction) => {
        const Icon = iconMap[transaction.icon] || ShoppingBag;
        const iconColor =
          iconColorMap[transaction.icon] || "bg-muted text-foreground";
        const isPositive = transaction.amount > 0;

        return (
          <div key={transaction.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${iconColor}`}>
                  <Icon className="size-4 md:size-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base text-[#333333]">
                    {transaction.category}
                  </p>
                  <p className="text-xs sm:text-sm text-[#666666]">
                    {transaction.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    isPositive ? "text-chart-2" : "text-foreground"
                  }`}
                >
                  {isPositive ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.percentage}%
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
