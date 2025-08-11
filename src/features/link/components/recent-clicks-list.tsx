import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { LinkClick } from "../types";

interface RecentClicksListProps {
  recentClicks: LinkClick[];
}

interface ClickItemProps {
  click: LinkClick;
  index: number;
}

const ClickItem = ({ click, index }: ClickItemProps) => (
  <div className="flex items-center justify-between p-3 bg-[#F2F2F2] rounded-md">
    <div className="flex items-center space-x-3">
      <Badge className="bg-[#F96D00] text-white">#{index + 1}</Badge>
      <div>
        <div className="text-sm font-medium text-[#393E46]">
          {click.ipAddress || "Bilinmeyen IP"}
        </div>
        {click.userAgent && (
          <div className="text-xs text-[#5C636E] truncate max-w-md">
            {click.userAgent}
          </div>
        )}
      </div>
    </div>
    <div className="text-sm text-[#5C636E]">
      {format(new Date(click.clickedAt), "dd MMM yyyy, HH:mm", {
        locale: tr,
      })}
    </div>
  </div>
);

export const RecentClicksList = ({ recentClicks }: RecentClicksListProps) => {
  if (recentClicks.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white border-[#5C636E]/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-[#393E46] flex items-center space-x-2">
          <Globe className="w-5 h-5 text-[#F96D00]" />
          <span>Son Tıklanmalar</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentClicks.slice(0, 10).map((click, index) => (
            <ClickItem key={click._id} click={click} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
