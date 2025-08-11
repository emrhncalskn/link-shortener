import { Card, CardContent } from "@/components/ui/card";
import { Link as LinkIcon } from "lucide-react";

export const TopLinksEmptyState = () => (
  <Card className="bg-white border-[#5C636E]/20">
    <CardContent className="p-8 text-center">
      <LinkIcon className="w-12 h-12 text-[#5C636E] mx-auto mb-4" />
      <p className="text-[#5C636E] text-lg">Henüz hiç link kısaltmamışsınız.</p>
      <p className="text-[#5C636E] text-sm mt-2">
        İlk linkinizi kısaltarak başlayın!
      </p>
    </CardContent>
  </Card>
);
