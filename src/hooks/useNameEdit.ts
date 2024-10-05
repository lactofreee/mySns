import { useState } from "react";
import { auth } from "../firebase/firebase";
import { updateProfile } from "firebase/auth";
import UpdateMultipleDocuments from "../utils/updateMultipleDocuments";

export const useNameEdit = () => {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName ?? "Anonymous");
  const [isEditingName, setIsEditingName] = useState(false);

  const startNameEdit = () => setIsEditingName(true);

  const cancelNameEdit = () => setIsEditingName(false);

  const handleNameChange = async (newName: string) => {
    if (!user) return;

    try {
      await updateProfile(user, { displayName: newName });
      setName(newName);
      setIsEditingName(false);
      await UpdateMultipleDocuments(user.uid, newName);
      alert("닉네임이 변경되었습니다.")
    } catch (error) {
      console.error("Name change failed:", error);
    }
  };

  return {
    name,
    isEditingName,
    startNameEdit,
    cancelNameEdit,
    handleNameChange,
  };
};
