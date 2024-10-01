import PostTweetForm from "../components/Posting/postTweetForm";
import styled from "styled-components";
import Timeline from "../components/Posting/timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  height: 100vh;
`;

const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-rows: 1fr 9fr;
  border: 1px solid #2f3336;
  height: 100%;
  overflow: hidden;
`;

const DummyBox = styled.div``;

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <PostTweetForm />
        <Timeline />
      </Container>
      <DummyBox></DummyBox>
    </Wrapper>
  );
};

export default Home;
