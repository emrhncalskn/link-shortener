"use client";
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
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "sonner";
import { useLogin } from "../hooks";
import { LoginRequest } from "../types";

function Login() {
  const { mutate: login } = useLogin();
  const handleLogin = ({ username, password }: LoginRequest) => {
    login(
      { username, password },
      {
        onSuccess: (data) => {
          console.log("Login successful:", data);
          Cookies.set("token", data, {
            expires: 7,
          });
          toast.success("Giriş Başarılı!");
          window.location.href = "/";
        },
        onError: (error) => {
          toast.error(`Giriş Başarısız!`);
        },
      }
    );
  };
  return (
    <div className="flex flex-col items-center justify-center my-10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-primary/85">
            Giriş Yap
          </CardTitle>
          <CardDescription className="text-center text-[#4e4e4e]">
            Lütfen kullanıcı adınızı ve şifrenizi girin.
            <br />
            Hesabınız yoksa kayıt olabilirsiniz.
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
              handleLogin({ username, password });
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
              Giriş Yap
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm">
            <p>
              Hesabınız yok mu?{" "}
              <Link
                href="/kayit"
                className="text-primary hover:scale-105 transition-transform duration-200 inline-block"
              >
                Kayıt Ol
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

export default Login;
