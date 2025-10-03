import {
  Gift,
  HandCoins,
  Home,
  ShoppingBag,
  Utensils,
  Car,
  HeartPulse,
  PiggyBank,
  Coins,
} from "lucide-react";
import { BiQrScan } from "react-icons/bi";
import { IoCardOutline } from "react-icons/io5";
import { RiCashLine } from "react-icons/ri";

export const categories = [
  "Shopping",
  "Food",
  "Home",
  "Transport",
  "Health",
  "Gifts",
  "Savings",
  "Salary",
  "Other",
] as const;

export const paymentMethods = ["Cash", "Card", "UPI"] as const;

export const DEFAULT_CATEGORY_ORDER = [
  "Shopping",
  "Food",
  "Home",
  "Transport",
  "Health",
  "Gifts",
  "Savings",
  "Salary",
  "Other",
];

export function paymentIcon(name: string) {
  switch (name) {
    case "Cash":
      return RiCashLine;
    case "Card":
      return IoCardOutline;
    case "UPI":
      return BiQrScan;
    default:
      return RiCashLine;
  }
}

// Icon mapper
export function categoryIcon(name: string) {
  switch (name) {
    case "Shopping":
      return ShoppingBag;
    case "Food":
      return Utensils;
    case "Home":
      return Home;
    case "Transport":
      return Car;
    case "Health":
      return HeartPulse;
    case "Gifts":
      return Gift;
    case "Savings":
      return PiggyBank;
    case "Salary":
      return HandCoins;
    default:
      return Coins;
  }
}
