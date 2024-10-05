import { useState } from "react";
import { auth, storage } from "../firebase/firebase";
import {
  updateUserProfilePicture,
  uploadAvatarToStorage,
} from "../utils/firebaseUtils";

export const useAvatar = () => {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL || null);

  const handleAvatarChange = async (file: File) => {
    if (!user) return;

    try {
      const avatarUrl = await uploadAvatarToStorage(file, user.uid, storage);
      setAvatar(avatarUrl);
      await updateUserProfilePicture(user, avatarUrl);
    } catch (error) {
      console.error("Avatar upload failed:", error);
    }
  };

  return { avatar, handleAvatarChange };
};
