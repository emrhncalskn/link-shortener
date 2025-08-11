"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { STATISTICS } from "@/constants/statistics.constant";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();

  return (
    <div>
      <div className="w-full flex px-16 items-center justify-center">
        <div className="flex items-start justify-between w-6xl gap-16 max-[991px]:flex-col">
          <div className="w-[48%] gap-8 flex flex-col max-[991px]:w-full max-[991px]:items-center max-[991px]:justify-center">
            <div className="gap-4 flex flex-col max-[991px]:items-center max-[991px]:text-center">
              <h1 className="text-7xl leading-[84px] tracking-[-4px] text-[#F96D00]/85 max-[991px]:text-[48px] max-[991px]:leading-[60px]">
                Link Kısaltmanın En Kolay Yolu
              </h1>
              <p className="text-[#4e4e4e] max-[991px]:text-sm">
                Linksy, uzun linklerinizi kolayca kısaltmanızı ve paylaşmanızı
                sağlar. Hızlı, güvenli ve kullanıcı dostu.
              </p>
            </div>
            <Button
              onClick={() => router.push("/olustur")}
              className="w-fit p-6 max-[991px]:p-4"
            >
              Hemen Link Kısalt
            </Button>
            <div className="flex w-full justify-around max-w-4xl">
              {STATISTICS.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-none bg-transparent"
                  >
                    <CardContent className="text-center p-8">
                      <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#F96D00] flex items-center justify-center">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      <div className="text-2xl sm:text-4xl lg:text-5xl xl:text-4xl font-bold text-[#3e3e3e] mb-2 text-center break-words">
                        {stat.number}
                      </div>

                      <div className="text-lg text-[#4e4e4e] font-medium text-center">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="w-[52%] flex items-center justify-center max-[991px]:w-full">
            <div className="rounded-3xl md:h-170 sm:h-130 object-cover">
              <img src={"/images/hero.jpg"}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
