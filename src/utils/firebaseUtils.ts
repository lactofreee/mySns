import { updateProfile, User } from "firebase/auth";
import {
  collection,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const uploadAvatarToStorage = async (
  file: File,
  userId: string,
  storage: FirebaseStorage,
) => {
  const locationRef = ref(storage, `avatar/${userId}`);
  const result = await uploadBytes(locationRef, file);
  return getDownloadURL(result.ref);
};

export const updateUserProfilePicture = async (
  user: User,
  avatarUrl: string,
) => {
  await updateProfile(user, { photoURL: avatarUrl });
};

export const fetchUserTweets = async (userId: string, db: Firestore) => {
  const tweetQuery = query(
    collection(db, "tweets"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(25),
  );
  const snapshot = await getDocs(tweetQuery);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
};
