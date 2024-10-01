import {
  Unsubscribe,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import Tweet from "./tweet";
import { useRecoilState } from "recoil";
import { tweetsState } from "../../Atom/atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export default function Timeline() {
  const [tweets, setTweets] = useRecoilState(tweetsState);

  useEffect(() => {
    const tweetsQuerry = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc"),
      limit(25),
    );
    const unsubscribe: Unsubscribe = onSnapshot(tweetsQuerry, (snapshot) => {
      const newTweets = snapshot.docs.map((doc) => {
        const { createdAt, photo, tweet, userId, username } = doc.data();
        return {
          createdAt,
          photo,
          tweet,
          userId,
          username,
          docId: doc.id,
        };
      });
      setTweets(newTweets);
    });
    return () => unsubscribe();
  }, [setTweets]);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.docId} {...tweet} />
      ))}
    </Wrapper>
  );
}
