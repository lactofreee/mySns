import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { ITweet } from "../components/Posting/tweet";
import { fetchUserTweets } from "../utils/firebaseUtils";

export const useTweets = () => {
  const user = auth.currentUser;
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    if (!user) return;

    const loadTweets = async () => {
      try {
        const fetchedTweets = await fetchUserTweets(user.uid, db);
        setTweets(fetchedTweets);
      } catch (error) {
        console.error("Failed to fetch tweets:", error);
      }
    };
    loadTweets();
  }, [user]);
  return { tweets };
};
