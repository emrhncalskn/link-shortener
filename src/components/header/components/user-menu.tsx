import { Link, LogOut, Menu, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserProfile } from "../../../features/user/types";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

interface UserMenuProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const UserMenu = ({
  userProfile,
  onNavigate,
  onLogout,
}: UserMenuProps) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-3">
      <span className="max-sm:hidden text-lg text-[#393E46]">Hoşgeldin!</span>
      <span className="max-sm:hidden font-semibold text-lg text-[#F96D00]">
        {userProfile.username}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon">
            <Menu className="scale-125" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-fit p-2 bg-white border-[#5C636E]/20"
          sideOffset={8}
        >
          <DropdownMenuItem
            onClick={() => onNavigate("/profil")}
            className={`text-[#393E46] ${
              pathname === "/profil" ? "bg-[#F2F2F2] text-[#F96D00]" : ""
            }`}
          >
            <User
              className={`mr-2 h-4 w-4 ${
                pathname === "/profil" ? "text-[#F96D00]" : "text-[#5C636E]"
              }`}
            />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onNavigate("/olustur")}
            className={`text-[#393E46] ${
              pathname === "/olustur" ? "bg-[#F2F2F2] text-[#F96D00]" : ""
            }`}
          >
            <Link
              className={`mr-2 h-4 w-4 ${
                pathname === "/olustur" ? "text-[#F96D00]" : "text-[#5C636E]"
              }`}
            />
            <span>Link Oluştur</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#5C636E]/20" />
          <DropdownMenuItem onClick={onLogout} className="text-[#393E46]">
            <LogOut className="mr-2 h-4 w-4 text-[#5C636E]" />
            <span>Çıkış</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
