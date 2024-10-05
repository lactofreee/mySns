import { styled } from "styled-components";
import Tweet, { ITweet } from "../Posting/tweet";

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
  border-left: 1px solid #2f3336;
  border-right: 1px solid #2f3336;
`;

interface ITweetListProps {
  tweets: ITweet[];
}

const TweetList = ({ tweets }:ITweetListProps) => {
  return (
    <TweetsContainer>
      {tweets.map((tweet) => (
        <Tweet key={tweet.docId} {...tweet} />
      ))}
    </TweetsContainer>
  );
};

export default TweetList;
