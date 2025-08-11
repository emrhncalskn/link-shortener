"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, FileX } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full py-10 flex items-center justify-center min-h-[60vh] px-16 max-[768px]:px-8">
      <div className="flex flex-col items-center justify-center text-center gap-15 max-w-2xl">
        <div className="relative">
          <div className="text-[120px] font-bold text-[#F96D00]/20 leading-none max-[768px]:text-[80px]">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-[#F96D00]/10 rounded-full p-6 max-[768px]:p-4">
              <FileX className="w-12 h-12 text-[#F96D00] max-[768px]:w-8 max-[768px]:h-8" />
            </div>
          </div>
        </div>

        <div className="gap-4 flex flex-col">
          <h1 className="text-[42px] leading-[52px] tracking-[-2px] text-[#F96D00]/85 font-semibold max-[768px]:text-[32px] max-[768px]:leading-[40px]">
            Sayfa Bulunamadı
          </h1>
          <p className="text-[#4e4e4e] text-lg max-[768px]:text-base leading-relaxed">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya
            dönerek aradığınızı bulabilirsiniz.
          </p>
        </div>

        <div className="flex gap-10 items-center max-[768px]:flex-col max-[768px]:w-full">
          <Button
            onClick={() => router.push("/")}
            className="p-6 max-[768px]:p-4 max-[768px]:w-full"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="p-6 max-[768px]:p-4 max-[768px]:w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Geri Dön
          </Button>
        </div>
      </div>
    </div>
  );
}
