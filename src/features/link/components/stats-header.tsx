"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const StatsHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        onClick={() => router.push("/linklerim")}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Geri Dön</span>
      </Button>
      <h1 className="text-2xl font-bold text-[#393E46]">Link İstatistikleri</h1>
    </div>
  );
};
