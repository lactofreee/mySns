import React from "react";
import PostTweetForm from "../components/post-tweet-form";
import styled from "styled-components";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

const Container = styled.div`
  display: grid;
  gap: 10px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
  border: 1px solid #2f3336;
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
