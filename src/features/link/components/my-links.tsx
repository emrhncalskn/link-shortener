"use client";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { useGetMyLinks } from "../hooks";
import { LinkCard } from "./link-card";
import { LinksEmptyState } from "./links-empty-state";
import { LinksLoadingSkeleton } from "./links-loading-skeleton";
import { LinksPagination } from "./links-pagination";

const LINKS_PER_PAGE = 9;

const LinksHeader = ({ total }: { total: number }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-2">
      <TrendingUp className="w-6 h-6 text-[#F96D00]" />
      <h2 className="text-2xl font-bold text-[#393E46]">Linklerim</h2>
    </div>
    <div className="text-sm text-[#5C636E]">Toplam {total} link</div>
  </div>
);

const LinksGrid = ({
  links,
  currentPage,
  linksPerPage,
}: {
  links: any[];
  currentPage: number;
  linksPerPage: number;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {links.map((link, index) => (
      <LinkCard
        key={link._id}
        link={link}
        index={(currentPage - 1) * linksPerPage + index + 1}
      />
    ))}
  </div>
);

export function MyLinks() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: linksData, isLoading: isLoading } = useGetMyLinks(
    currentPage,
    LINKS_PER_PAGE
  );

  const links = linksData?.links || [];
  const totalPages = Math.ceil((linksData?.total || 0) / LINKS_PER_PAGE);

  if (isLoading) {
    return <LinksLoadingSkeleton linksPerPage={LINKS_PER_PAGE} />;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <LinksHeader total={linksData?.total || 0} />

        {links.length == 0 ? (
          <LinksEmptyState />
        ) : (
          <>
            <LinksGrid
              links={links}
              currentPage={currentPage}
              linksPerPage={LINKS_PER_PAGE}
            />

            <LinksPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={linksData?.total || 0}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
