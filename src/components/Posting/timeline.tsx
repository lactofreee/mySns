import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import Tweet from "./tweet";

export interface ITweet {
  createdAt: number;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  id: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuerry = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsubscribe = await onSnapshot(tweetsQuerry, (snapshot) => {
        const newTweets = snapshot.docs.map((doc) => {
          const { createdAt, photo, tweet, userId, username } = doc.data();
          return {
            id: doc.id,
            createdAt,
            photo,
            tweet,
            userId,
            username,
          };
        });
        setTweets(newTweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
