"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LinkIcon,
  Calendar,
  Edit3,
  Trash2,
  Save,
  X,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LinkResponse } from "../types";
import { useDeleteLink, useUpdateLinkCustomCode } from "../hooks";

interface LinkInfoCardProps {
  link: LinkResponse;
  onUpdate?: () => void;
}

export const LinkInfoCard = ({ link, onUpdate }: LinkInfoCardProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newCustomCode, setNewCustomCode] = useState(link.shortCode);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { mutate: updateCustomCode, isPending: isUpdating } =
    useUpdateLinkCustomCode();
  const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink();

  const handleShortCodeClick = () => {
    window.open(link.shortUrl || `/${link.shortCode}`, "_blank");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setNewCustomCode(link.shortCode);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewCustomCode(link.shortCode);
  };

  const handleSaveEdit = () => {
    if (newCustomCode.trim() === "") {
      toast.error("Kısa kod boş olamaz");
      return;
    }

    if (newCustomCode === link.shortCode) {
      setIsEditing(false);
      return;
    }

    updateCustomCode(
      { shortCode: link.shortCode, newShortCode: newCustomCode.trim() },
      {
        onSuccess: () => {
          toast.success("Kısa kod güncellendi!");
          setIsEditing(false);
          onUpdate?.();
          router.push(`/link/detay/${newCustomCode.trim()}`);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Güncelleme başarısız");
        },
      }
    );
  };

  const handleDelete = () => {
    deleteLink(link.shortCode, {
      onSuccess: () => {
        toast.success("Link başarıyla silindi!");
        router.push("/linklerim");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Silme işlemi başarısız");
      },
    });
  };

  return (
    <Card className="bg-white border-[#5C636E]/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#393E46] flex items-center space-x-2">
            <LinkIcon className="w-5 h-5 text-[#F96D00]" />
            <span>Link Bilgileri</span>
          </CardTitle>

          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="text-[#F96D00] border-[#F96D00] hover:bg-[#F96D00] hover:text-white"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
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
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="text-gray-500 border-gray-500 hover:bg-gray-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs font-medium text-[#5C636E] uppercase tracking-wide">
            Orijinal URL
          </label>
          <p className="text-[#393E46] text-sm break-all bg-[#F2F2F2] p-3 rounded-md mt-1">
            {link.originalUrl}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-[#5C636E] uppercase tracking-wide">
              Kısa Kod
            </label>
            {isEditing ? (
              <div className="mt-1">
                <Input
                  value={newCustomCode}
                  onChange={(e) => setNewCustomCode(e.target.value)}
                  placeholder="Yeni kısa kod"
                  className="font-mono"
                  disabled={isUpdating}
                />
              </div>
            ) : (
              <div
                className="flex items-center space-x-2 mt-1 cursor-pointer hover:bg-[#F2F2F2] p-2 rounded-md transition-colors"
                onClick={handleShortCodeClick}
                title="Kısa linki açmak için tıklayın"
              >
                <LinkIcon className="w-4 h-4 text-[#F96D00]" />
                <span className="text-[#F96D00] font-mono font-medium hover:underline">
                  {link.shortCode}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-[#5C636E] uppercase tracking-wide">
              Oluşturulma Tarihi
            </label>
            <div className="flex items-center space-x-2 mt-1 p-2">
              <Calendar className="w-4 h-4 text-[#5C636E]" />
              <span className="text-[#393E46] text-sm">
                {format(new Date(link.createdAt), "dd MMMM yyyy, HH:mm", {
                  locale: tr,
                })}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#5C636E] uppercase tracking-wide">
              Güncellenme Tarihi
            </label>
            <div className="flex items-center space-x-2 mt-1 p-2">
              <Calendar className="w-4 h-4 text-[#5C636E]" />
              <span className="text-[#393E46] text-sm">
                {format(new Date(link.updatedAt), "dd MMMM yyyy, HH:mm", {
                  locale: tr,
                })}
              </span>
            </div>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <h4 className="text-sm font-medium text-red-800 mb-2">Linki Sil</h4>
            <p className="text-sm text-red-600 mb-4">
              Bu işlem geri alınamaz. Link kalıcı olarak silinecek ve artık
              erişilemeyecek.
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
                    Evet, Sil
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
      </CardContent>
    </Card>
  );
};
