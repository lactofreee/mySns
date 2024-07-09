import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Btn = styled.span`
  margin-top: 80px;
  width: 100%;
  color: black;
  background-color: white;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 50px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

const GithubBtn = () => {
  const navigate = useNavigate()
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Btn onClick={onClick}>
      <Logo src="/github-mark.svg" />
      Continue with Github
    </Btn>
  );
};

export default GithubBtn;
