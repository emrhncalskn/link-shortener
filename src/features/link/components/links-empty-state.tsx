"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const LinksEmptyState = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/olustur");
  };

  return (
    <Card className="bg-white border-[#5C636E]/20 flex items-center justify-center">
      <CardContent className="p-8 text-center">
        <LinkIcon className="w-12 h-12 text-[#F96D00] mx-auto mb-4" />
        <p className="text-[#5C636E] text-lg">
          Henüz hiç link kısaltmamışsınız.
        </p>
        <p className="text-[#5C636E] text-sm mt-2">
          İlk linkinizi kısaltarak başlayın!
        </p>
      </CardContent>
      <Button onClick={handleClick} className="w-fit">
        Link Oluştur
      </Button>
    </Card>
  );
};
