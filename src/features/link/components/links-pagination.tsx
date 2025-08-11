import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LinksPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const LinksPagination = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: LinksPaginationProps) => {
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxPagesToShow; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <>
      <div className="flex items-center justify-center space-x-4 mt-8">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Önceki</span>
        </Button>

        <div className="flex items-center space-x-2">
          {getPageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 ${
                currentPage === pageNum
                  ? "bg-[#F96D00] hover:bg-[#F96D00]/90"
                  : ""
              }`}
            >
              {pageNum}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="flex items-center space-x-2"
        >
          <span>Sonraki</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center text-sm text-[#5C636E] mt-4">
        Sayfa {currentPage} / {totalPages} • Toplam {totalItems} link
      </div>
    </>
  );
};
