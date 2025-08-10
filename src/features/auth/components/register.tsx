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
  const handleRegister = ({
    username,
    password,
    idNumber,
    mobile,
  }: RegisterRequest) => {
    register(
      { username, password, idNumber, mobile },
      {
        onSuccess: () => {
          toast.success("Kayıt Başarılı!");
          window.location.href = "/giris";
        },
        onError: (error) => {
          toast.error("Kayıt Başarısız!");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-primary/85">
            Kayıt Ol
          </CardTitle>
          <CardDescription className="text-center text-[#4e4e4e]">
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
              const idNumber = formData.get("idNumber") as unknown as number;
              const mobile = formData.get("mobile") as unknown as number;
              handleRegister({ username, password, idNumber, mobile });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Kullanıcı adınızı girin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Şifrenizi girin"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Kayıt Ol
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm">
            <p>
              Zaten hesabınız var mı?{" "}
              <Link
                href="/giris"
                className="text-primary hover:scale-105 transition-transform duration-200 inline-block"
              >
                Giriş Yap
              </Link>
            </p>
            <p>
              <Link
                href="/"
                className="text-primary hover:scale-105 transition-transform duration-200 inline-block"
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
