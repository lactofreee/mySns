import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase/firebase";

import { GoHomeFill } from "react-icons/go";
import { BiSolidUser } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const MenuComponent = styled.div`
  /* outline: 1px dotted red; */
  border-radius: 30px;
  padding: 15px 25px 12px 12px;
  transition: background-color 0.09s ease-in;
  &:hover {
    background-color: #181818;
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  gap: 20px;
  &.logOut {
    gap: 17px;
  }
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &.logOut {
    padding-left: 3px;
  }
`;
const MenuTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
`;

const NavBar = () => {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const confirmLogOut = confirm("Are you sure you want to log out?");
    if (confirmLogOut) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <>
      <Menu>
        <MenuComponent>
          <Link to="/">
            <MenuItemContainer>
              <MenuItem>
                <GoHomeFill size="30" />
              </MenuItem>
              <MenuTitle>홈</MenuTitle>
            </MenuItemContainer>
          </Link>
        </MenuComponent>
        <MenuComponent>
          <Link to="/profile">
            <MenuItemContainer>
              <MenuItem>
                <BiSolidUser size="30" />
              </MenuItem>
              <MenuTitle>프로필</MenuTitle>
            </MenuItemContainer>
          </Link>
        </MenuComponent>
        <MenuComponent>
          <MenuItemContainer className="logOut">
            <MenuItem className="logOut">
              <TbLogout size="30" />
            </MenuItem>
            <MenuTitle onClick={onLogOut}>로그아웃</MenuTitle>
          </MenuItemContainer>
        </MenuComponent>
      </Menu>
    </>
  );
};

export default NavBar;
