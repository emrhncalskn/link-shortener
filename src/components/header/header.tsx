"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserMenu } from "./components/user-menu";
import Skeleton from "../skeleton/skeleton";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/giris");
  };
  const handleRegister = () => {
    router.push("/kayit");
  };
  const handleNavigation = (path: string) => router.push(path);

  const { userProfile, isLoading } = useUserProfile();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("Çıkış başarılı!");
    window.location.href = "/giris";
  };

  return (
    <header
      id="#"
      className="relative top-0 z-40 bg-white border-b w-full shadow-sm"
    >
      <div className="flex items-center px-5 py-5 gap-20 max-w-7xl mx-auto">
        <div className="flex-1 flex items-center">
          <a
            href="/"
            className="flex items-center gap-4 hover:scale-110 transition-transform duration-300"
          >
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-auto h-15 rounded-xl "
            />
            <p className="text-[#F96D00]/90 font-semibold text-2xl">Linksy</p>
          </a>
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          {isLoading ? (
            <Skeleton className="max-[991px]:hidden w-50 h-4" />
          ) : userProfile ? (
            <UserMenu
              userProfile={userProfile}
              onNavigate={handleNavigation}
              onLogout={logout}
            />
          ) : (
            <div className="flex items-center gap-5">
              <Button variant={"outline"} onClick={handleLogin}>
                Giriş Yap
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
