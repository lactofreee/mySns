import { styled } from "styled-components";

import NavBar from "../components/Nav/NavBar";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  max-width: 1250px;
  gap: 20px;
  grid-template-columns: 1fr 4fr auto;
`;

export default function Layout() {
  return (
    <Wrapper>
      <NavBar />
      <Outlet />
    </Wrapper>
  );
}
