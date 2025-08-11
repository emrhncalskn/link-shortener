"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateUrl } from "@/utils";
import { Copy, Link, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useShortenUrl } from "../hooks";
import { LinkFeatures } from "./link-features";

export default function CreateLink() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const { mutate: shortenUrl, isPending } = useShortenUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUrl(originalUrl)) {
      toast.error("Lütfen geçerli bir URL girin");
      return;
    }

    shortenUrl(
      { originalUrl, customCode: customCode || undefined },
      {
        onSuccess: (data) => {
          setShortUrl(data.shortUrl);
          toast.success("Link başarıyla kısaltıldı!");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Bir hata oluştu");
        },
      }
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Link panoya kopyalandı!");
    } catch {
      toast.error("Kopyalama başarısız");
    }
  };

  const handleReset = () => {
    setOriginalUrl("");
    setCustomCode("");
    setShortUrl("");
  };

  return (
    <div className="bg-[#F2F2F2] px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-[#F96D00] mb-4">Linksy</h1>
          <p className="text-xl text-[#5C636E]">
            Uzun linklerinizi kolayca kısaltın ve paylaşın
          </p>
        </header>

        <Card className="bg-white border-[#5C636E]/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#F96D00] text-center">
              Link Kısaltma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url" className="text-[#393E46] font-medium">
                  Kısaltılacak Link
                </Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C636E] w-5 h-5" />
                  <Input
                    id="url"
                    placeholder="https://ornek.com/acilen-kisaltilmasi-gereken-uzun-ve-karmasik-link"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="pl-10 bg-[#F2F2F2] border-[#5C636E]/30 text-[#393E46] placeholder:text-[#5C636E] focus:border-[#F96D00]"
                    disabled={isPending}
                    required
                  />
                </div>
              </div>

              {/* Custom Code Input */}
              <div className="space-y-2">
                <Label htmlFor="code" className="text-[#393E46] font-medium">
                  Özel Kod (İsteğe Bağlı)
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="benim-ozel-linkim"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="bg-[#F2F2F2] border-[#5C636E]/30 text-[#393E46] placeholder:text-[#5C636E] focus:border-[#F96D00]"
                  disabled={isPending}
                />
                <p className="text-sm text-[#5C636E]">
                  Boş bırakırsanız otomatik kod oluşturulur
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F96D00] hover:bg-[#F96D00]/90 text-white font-medium py-3"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Kısaltılıyor...
                  </>
                ) : (
                  "Linki Kısalt"
                )}
              </Button>
            </form>

            {shortUrl && (
              <Card className="mt-6 bg-[#F96D00]/10 border-[#F96D00]/30">
                <CardHeader>
                  <CardTitle className="text-[#F96D00] text-lg">
                    Kısaltılmış Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={shortUrl}
                      readOnly
                      className="bg-[#F2F2F2] border-[#5C636E]/30 text-[#393E46]"
                    />
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="icon"
                      className="border-[#F96D00] text-[#F96D00] hover:bg-[#F96D00] hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button onClick={handleReset} variant="link" className="">
                    Yeni Link Kısalt
                  </Button>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <LinkFeatures />
      </div>
    </div>
  );
}
