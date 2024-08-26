import { styled } from "styled-components";

import NavBar from "./Nav/NavBar";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  max-width: 1250px;
  padding: 50px 0px;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
`;

export default function Layout() {
  return (
    <Wrapper>
      <NavBar />
      <Outlet />
    </Wrapper>
  );
}
