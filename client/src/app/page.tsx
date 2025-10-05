import { Particles } from "@/components/ui/particles";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdCalculate } from "react-icons/md";
import {
  TrendingUp,
  PieChart,
  Brain,
  SquareArrowOutUpRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";

const features = [
  {
    icon: TrendingUp,
    title: "Track expenses easily",
    description:
      "Effortlessly monitor your spending with intuitive categorization",
    color: "ledger-green",
  },
  {
    icon: PieChart,
    title: "Visualize with colorful charts",
    description: "Beautiful, interactive charts that make your data come alive",
    color: "ledger-pink",
  },
  {
    icon: Brain,
    title: "Smart insights powered by AI",
    description: "Get personalized recommendations to optimize your finances",
    color: "ledger-purple",
  },
];

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Main gradient background */}

      <main className="z-10 relative h-screen bg-gradient-to-b from-orange-500 via-orange-200 to-white">
        <Particles size={0.8} quantity={20} color="#666666" />
        <div>
          <RiMoneyRupeeCircleFill className="floating-element-1 absolute top-10 md:top-20 -rotate-[30deg] left-10 md:left-20 size-16 md:size-20 text-black opacity-20" />
          <RiMoneyRupeeCircleFill className="floating-element-2 absolute top-20 md:top-40 rotate-[30deg] right-15 md:right-30 size-16 md:size-20 text-black opacity-20" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-96">
          {/* Mobile curve - gentler */}
          <svg
            className="absolute bottom-0 w-full h-full md:hidden"
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id="blur-mobile"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>
            <path
              d="M0,200 Q600,280 1200,200 L1200,320 L0,320 Z"
              fill="white"
              filter="url(#blur-mobile)"
            />
          </svg>
          {/* Desktop curve - sharper */}
          <svg
            className="absolute bottom-0 w-full h-full hidden md:block"
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id="blur-desktop"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              </filter>
            </defs>
            <path
              d="M0,160 Q600,320 1200,160 L1200,320 L0,320 Z"
              fill="white"
              filter="url(#blur-desktop)"
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24">
          <MdCalculate className="floating-element-3 rotate-[20deg] size-16 md:size-20 text-black opacity-20" />
          <h1 className="glowing-text text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#333333] drop-shadow-lg">
            Ledger
          </h1>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl text-[#666666] drop-shadow-md max-w-2xl">
            Your personal finance companion, powered by AI.
          </p>
          <div className="flex gap-6 mt-6">
            <LoginButton />
          </div>
          <p className="flex gap-2 mt-10 md:mt-12 text-sm md:text-base text-[#474747] items-center">
            <span>Learn More</span>
            <ChevronDown className="size-5 animate-bounce text-[#666666]" />
          </p>
        </div>
      </main>

      <section className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
              Why <span className="text-orange-400">Ledger?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;

              const getBackgroundColor = (color: string) => {
                switch (color) {
                  case "ledger-green":
                    return "bg-green-200";
                  case "ledger-pink":
                    return "bg-pink-200";
                  case "ledger-purple":
                    return "bg-purple-200";
                  case "ledger-blue":
                    return "bg-blue-200";
                  case "ledger-yellow":
                    return "bg-yellow-200";
                  default:
                    return "bg-green-200";
                }
              };

              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-card border border-border shadow-feature hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${getBackgroundColor(
                      feature.color
                    )} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-[#333333]" />
                  </div>

                  <h3 className="text-xl font-semibold text-[#333333] mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-[#666666] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-white">
        <Link
          className="flex gap-2 items-center justify-center text-xs sm:text-sm text-[#474747]"
          target="_blank"
          href={"https://subhammani.xyz"}
        >
          <span>Created by Subham Mani</span>
          <SquareArrowOutUpRight className="size-4 text-black" />
        </Link>
      </footer>
    </div>
  );
}
