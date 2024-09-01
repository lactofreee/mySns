import styled from "styled-components";
import { ITweet } from "./timeline";

import MeatballMenu from "../../utils/meatballMenu";
import { auth } from "../../firebase/firebase";
import { User } from "firebase/auth";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-top: 1px;
  border-bottom: 1px;
  border-color: #2f3336;
  border-style: solid;
  color: white;
  gap: 10px;
`;

const Containner = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px, 0px;
  font-size: 15px;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

export interface MeatballMenuProps {
  currentUser: User | null;
  id: string;
  photo: string;
  username: string;
  userId: string;
  tweet: string;
}

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const currentUser = auth.currentUser;
  const meatballMenuProps = {
    currentUser,
    username,
    photo,
    tweet,
    userId,
    id,
  };

  return (
    <Wrapper>
      <Containner>
        <Username>{username}</Username>
        <MeatballMenu {...meatballMenuProps} />
      </Containner>
      <Payload>{tweet}</Payload>
      {photo ? <Photo src={photo} /> : null}
    </Wrapper>
  );
}
