import PremiumCard from "../ui/PremimuCard"

export default function DashboardCards() {
  const cards = [
    {
      title: "Exclusive Analytics",
      description: "Deep insights with a premium look.",
      image: "https://images.unsplash.com/photo-1549921296-3a53242a116d",
    },
    {
      title: "Luxury Dashboard",
      description: "Beautiful UI designed for elegance.",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926",
    },
    {
      title: "Smart AI Tools",
      description: "Enhance performance effortlessly.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, i) => (
        <PremiumCard key={i} {...card} />
      ))}
    </div>
  );
}
