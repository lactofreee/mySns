import styled from "styled-components";


import MeatballMenu from "../../utils/meatballMenu";
import { auth } from "../../firebase/firebase";


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


export interface ITweet {
  createdAt: number;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  docId: string;
}

export default function Tweet({
  createdAt,
  photo,
  tweet,
  userId,
  username,
  docId,
}: ITweet) {
  const currentUser = auth.currentUser;
  const meatballMenuProps = {
    createdAt,
    photo,
    tweet,
    userId,
    username,
    docId,
    currentUser,
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
