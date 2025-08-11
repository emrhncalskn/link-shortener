"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Calendar, Edit3, Trash2, Save, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import Cookies from "js-cookie";
import { useUpdateProfile, useDeleteProfile } from "../hooks";
import { UserProfile } from "../types";

interface ProfileHeaderProps {
  userProfile: UserProfile | null;
  onProfileUpdate?: () => void;
}

export const ProfileHeader = ({
  userProfile,
  onProfileUpdate,
}: ProfileHeaderProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(userProfile?.username || "");
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteProfile();

  const handleEdit = () => {
    setIsEditing(true);
    setNewUsername(userProfile?.username || "");
    setNewPassword("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewUsername(userProfile?.username || "");
    setNewPassword("");
  };

  const handleSaveEdit = () => {
    if (newUsername.trim() === "") {
      toast.error("Kullanıcı adı boş olamaz");
      return;
    }

    const hasUsernameChanged = newUsername !== userProfile?.username;
    const hasPasswordChanged = newPassword.trim() !== "";

    if (!hasUsernameChanged && !hasPasswordChanged) {
      setIsEditing(false);
      return;
    }

    const updateData: { username?: string; password?: string } = {};

    if (hasUsernameChanged) {
      updateData.username = newUsername.trim();
    }

    if (hasPasswordChanged) {
      updateData.password = newPassword.trim();
    }

    updateProfile(updateData, {
      onSuccess: (updatedUserData) => {
        toast.success("Profil güncellendi!");
        setIsEditing(false);
        setNewPassword("");

        if (hasUsernameChanged && updatedUserData) {
          try {
            const currentUserCookie = Cookies.get("user");
            if (currentUserCookie) {
              const currentUser = JSON.parse(currentUserCookie);
              const updatedUser = {
                ...currentUser,
                username: updatedUserData.username || newUsername.trim(),
              };
              Cookies.set("user", JSON.stringify(updatedUser), {
                expires: 7,
                path: "/",
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
              });

              onProfileUpdate?.();
            }
          } catch (error) {
            console.error("Error updating user cookie:", error);
          }
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Güncelleme başarısız");
      },
    });
  };

  const handleDelete = () => {
    deleteProfile(undefined, {
      onSuccess: () => {
        toast.success("Profil başarıyla silindi!");
        router.push("/");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Silme işlemi başarısız");
      },
    });
  };

  return (
    <Card className="bg-white border-[#5C636E]/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-[#F96D00] text-white text-xl font-bold">
              {userProfile?.username?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl text-[#393E46] mb-2">
              Profil Bilgileri
            </CardTitle>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#5C636E]" />
                  {isEditing ? (
                    <Input
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Kullanıcı adı"
                      className="w-48"
                      disabled={isUpdating}
                    />
                  ) : (
                    <span className="text-[#393E46] font-medium">
                      {userProfile?.username || "Kullanıcı"}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#5C636E]" />
                  <span className="text-[#5C636E] text-sm">
                    {userProfile?.createdAt
                      ? `Üye olundu: ${format(
                          new Date(userProfile.createdAt),
                          "dd MMMM yyyy",
                          { locale: tr }
                        )}`
                      : "Üye olundu"}
                  </span>
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Yeni şifre (opsiyonel)"
                    className="w-48"
                    disabled={isUpdating}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="text-[#F96D00] border-[#F96D00] hover:bg-[#F96D00] hover:text-white"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Düzenle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Sil
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={isUpdating}
                  className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Kaydet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  İptal
                </Button>
              </>
            )}
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              Profili Sil
            </h4>
            <p className="text-sm text-red-600 mb-4">
              Bu işlem geri alınamaz. Profiliniz ve tüm linkleriniz kalıcı
              olarak silinecek.
            </p>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Siliniyor...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Evet, Profili Sil
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                İptal
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
    </Card>
  );
};
