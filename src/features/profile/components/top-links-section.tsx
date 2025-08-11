import { TrendingUp } from "lucide-react";
import { LinkResponse } from "@/features/link/types";
import { TopLinksEmptyState } from "./top-links-empty-state";
import { TopLinkCard } from "./top-link-card";

interface TopLinksSectionProps {
  links: LinkResponse[];
}

export const TopLinksSection = ({ links }: TopLinksSectionProps) => {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-[#F96D00]" />
        <h2 className="text-2xl font-bold text-[#393E46]">
          En Çok Tıklanan Linkler
        </h2>
      </div>

      {links.length === 0 ? (
        <TopLinksEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <TopLinkCard key={link._id} link={link} rank={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
