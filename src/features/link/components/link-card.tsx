"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MousePointer, LinkIcon, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { LinkResponse } from "../types";

interface LinkCardProps {
  link: LinkResponse;
  index: number;
}

export const LinkCard = ({ link, index }: LinkCardProps) => {
  const router = useRouter();

  const handleShortCodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(link.shortUrl || `/${link.shortCode}`, "_blank");
  };

  const handleCardClick = () => {
    router.push(`/link/detay/${link.shortCode}`);
  };

  return (
    <Card
      className="bg-white border-[#5C636E]/20 shadow-md hover:shadow-lg transition-all cursor-pointer hover:border-[#F96D00]/30 group"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="bg-[#F96D00] text-white hover:bg-[#F96D00]/90"
          >
            #{index}
          </Badge>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <MousePointer className="w-4 h-4 text-[#5C636E]" />
              <span className="text-[#393E46] font-bold">
                {link.clicks || 0}
              </span>
              <span className="text-[#5C636E] text-sm">tık</span>
            </div>
            <BarChart3 className="w-4 h-4 text-[#F96D00] opacity-60 group-hover:opacity-100 transition-opacity" />
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

        <div className="mt-3 pt-3 border-t border-[#5C636E]/10">
          <div className="flex items-center justify-center text-xs text-[#5C636E] group-hover:text-[#F96D00] transition-colors">
            <BarChart3 className="w-3 h-3 mr-1" />
            İstatistikleri görmek için tıklayın
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
