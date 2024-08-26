import styled from "styled-components";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border-top: 1px;
  border-bottom: 1px;
  border-color: #2F3336;
  border-style: solid;
  color: white;
`;

const Colum = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

export default function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <Wrapper>
      <Colum>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
      </Colum>
      {photo ? (
        <Colum>
          <Photo src={photo} />
        </Colum>
      ) : null}
    </Wrapper>
  );
}
