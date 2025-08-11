"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const StatsErrorState = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white border-[#5C636E]/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-[#393E46] mb-4">
              Link Bulunamadı
            </h2>
            <p className="text-[#5C636E] mb-6">
              Bu link mevcut değil veya erişim izniniz yok.
            </p>
            <Button onClick={() => router.push("/linklerim")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
