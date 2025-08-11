import { Card, CardContent } from "@/components/ui/card";
import { MousePointer, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { LinkResponse, LinkClick } from "../types";

interface StatsCardsProps {
  link: LinkResponse;
  recentClicks: LinkClick[];
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
}

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
  <Card className="bg-white border-[#5C636E]/20 shadow-md">
    <CardContent className="p-6 text-center">
      <Icon className="w-8 h-8 text-[#F96D00] mx-auto mb-3" />
      <div className="text-3xl font-bold text-[#393E46] mb-1">{value}</div>
      <div className="text-sm text-[#5C636E]">{label}</div>
    </CardContent>
  </Card>
);

export const StatsCards = ({ link, recentClicks }: StatsCardsProps) => {
  const lastClickDate =
    recentClicks.length > 0
      ? format(new Date(recentClicks[0].clickedAt), "dd/MM", { locale: tr })
      : "---";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={MousePointer}
        value={link.clicks || 0}
        label="Toplam Tıklanma"
      />
      <StatCard
        icon={TrendingUp}
        value={recentClicks.length}
        label="Son Tıklanmalar"
      />
      <StatCard icon={Clock} value={lastClickDate} label="Son Tıklanma" />
    </div>
  );
};
