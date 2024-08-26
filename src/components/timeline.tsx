import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase/firebase";
import Tweet from "./tweet";

export interface ITweet {
  createdAt: number;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  id: string;
}

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuerry = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuerry);
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
  };

  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      {tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
    </Wrapper>
  );
}
