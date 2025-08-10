import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserProfile } from "@/features/user/types";

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = () => {
      try {
        const user = Cookies.get("user");
        setUserProfile(user ? JSON.parse(user) : null);
      } catch (error) {
        console.error("Error parsing user profile:", error);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  return { userProfile, isLoading };
};
