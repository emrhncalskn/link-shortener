"use client";
import React from "react";
import { useRegister } from "../hooks";
import { RegisterRequest } from "../types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

function Register() {
  const { mutate: register } = useRegister();
  const handleRegister = ({ username, password }: RegisterRequest) => {
    register(
      { username, password },
      {
        onSuccess: () => {
          toast.success("Kayıt Başarılı!");
          window.location.href = "/giris";
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Kayıt başarısız!");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 p-4 bg-[#F2F2F2]">
      <Card className="w-full max-w-md bg-white border-[#5C636E]/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-[#393E46]">
            Kayıt Ol
          </CardTitle>
          <CardDescription className="text-center text-[#5C636E]">
            Hesap oluşturmak için bilgilerinizi girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const username = formData.get("username") as string;
              const password = formData.get("password") as string;
              handleRegister({ username, password });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#393E46]">
                Kullanıcı Adı
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Kullanıcı adınızı girin"
                className="bg-[#F2F2F2] border-[#5C636E]/30 text-[#393E46] placeholder:text-[#5C636E] focus:border-[#F96D00]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#393E46]">
                Şifre
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Şifrenizi girin"
                className="bg-[#F2F2F2] border-[#5C636E]/30 text-[#393E46] placeholder:text-[#5C636E] focus:border-[#F96D00]"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Kayıt Ol
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm">
            <p className="text-[#5C636E]">
              Zaten hesabınız var mı?{" "}
              <Link
                href="/giris"
                className="text-[#F96D00] hover:scale-105 transition-transform duration-200 inline-block font-medium"
              >
                Giriş Yap
              </Link>
            </p>
            <p>
              <Link
                href="/"
                className="text-[#F96D00] hover:scale-105 transition-transform duration-200 inline-block font-medium"
              >
                Ana Sayfaya Dön
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
