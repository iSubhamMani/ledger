interface SummaryData {
  day: number;
  week: number;
  month: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

const SummaryCards = ({ data }: SummaryCardsProps) => {
  const cards = [
    { label: "Day", value: data.day },
    { label: "Week", value: data.week },
    { label: "Month", value: data.month },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 py-4 md:px-4 container mx-auto">
      {cards.map((card) => (
        <div key={card.label} className="p-4 text-center rounded-2xl bg-muted">
          <p className="text-xs sm:text-sm text-[#666666] mb-1">{card.label}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#333333]">
            ${Math.abs(card.value)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
