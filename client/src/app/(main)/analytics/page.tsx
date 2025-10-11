"use client";

import ChartsSection from "@/components/ChartsSection";
import { Nav } from "@/components/Nav";
import SummaryCards from "@/components/SummaryCards";
import TransactionsList from "@/components/TransactionList";

const mockTransactions = [
  {
    id: "1",
    category: "Shopping",
    icon: "shopping",
    paymentMethod: "Cash",
    amount: -498.5,
    percentage: 32,
  },
  {
    id: "2",
    category: "Gifts",
    icon: "gifts",
    paymentMethod: "Card",
    amount: -344.45,
    percentage: 21,
  },
  {
    id: "3",
    category: "Food",
    icon: "food",
    paymentMethod: "Cash",
    amount: -230.5,
    percentage: 12,
  },
];

export default function Analytics() {
  return (
    <div className="min-h-screen mx-4 md:px-6 pt-10 lg:pt-6 relative">
      <ChartsSection />
      <SummaryCards data={{ day: 52, week: 403, month: 1612 }} />
      <TransactionsList transactions={mockTransactions} />
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-fit z-50">
        <Nav />
      </div>
    </div>
  );
}
