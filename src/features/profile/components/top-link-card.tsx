import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MousePointer, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { LinkResponse } from "@/features/link/types";

interface TopLinkCardProps {
  link: LinkResponse;
  rank: number;
}

export const TopLinkCard = ({ link, rank }: TopLinkCardProps) => {
  const handleShortCodeClick = () => {
    window.open(link.shortUrl || `/${link.shortCode}`, "_blank");
  };

  return (
    <Card className="bg-white border-[#5C636E]/20 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="bg-[#F96D00] text-white hover:bg-[#F96D00]/90"
          >
            #{rank}
          </Badge>
          <div className="flex items-center space-x-1">
            <MousePointer className="w-4 h-4 text-[#5C636E]" />
            <span className="text-[#393E46] font-bold">{link.clicks || 0}</span>
            <span className="text-[#5C636E] text-sm">tık</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs font-medium text-[#5C636E] uppercase tracking-wide">
            Orijinal URL
          </label>
          <p className="text-[#393E46] text-sm break-all bg-[#F2F2F2] p-2 rounded-md mt-1">
            {link.originalUrl}
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-[#5C636E] uppercase tracking-wide">
            Kısa Kod
          </label>
          <div
            className="flex items-center space-x-2 mt-1 cursor-pointer hover:bg-[#F2F2F2] p-2 rounded-md transition-colors"
            onClick={handleShortCodeClick}
          >
            <LinkIcon className="w-4 h-4 text-[#F96D00]" />
            <span className="text-[#F96D00] font-mono font-medium hover:underline">
              {link.shortCode}
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-[#5C636E] uppercase tracking-wide">
            Oluşturulma Tarihi
          </label>
          <p className="text-[#5C636E] text-sm mt-1">
            {format(new Date(link.createdAt), "dd MMM yyyy, HH:mm", {
              locale: tr,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
