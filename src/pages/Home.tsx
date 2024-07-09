import React from 'react';
import { auth } from '../firebase/firebase';
import { styled } from 'styled-components';

const LogOutBtn = styled.button`
  height: 20px;
`

const Home = () => {
  const logOut = () => {
    auth.signOut()
  }
  return (
    <>
      <LogOutBtn onClick={logOut}>Log Out</LogOutBtn>
    </>
  );
};

export default Home;