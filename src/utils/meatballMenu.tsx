import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import DropDown from "./dropdown";
import { styled } from "styled-components";
import { User } from "firebase/auth";
import { modalState } from "../Atom/atom";
import { useRecoilValue } from "recoil";

const Wrapper = styled.div`
  color: white;
  cursor: pointer;
  position: relative;
  display: flex;
`;

interface MeatballMenuProps {
  photo: string;
  userId: string;
  docId: string;
  currentUser: User | null;
}

export default function MeatballMenu({
  currentUser,
  userId,
  docId,
  photo,
}: MeatballMenuProps) {
  const isModalOpen = useRecoilValue(modalState);
  const [isDropdownVisivle, setIsDropdownVisivle] = useState(false);
  const [isUserAuthorizedToDelete, setIsUserAuthorizedToDelete] =
    useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsDropdownVisivle(!isDropdownVisivle);
  };

  const handleMousedownOutside = (e: MouseEvent) => {
    // early return pattern으로 조건에 맞지 않는경우 불필요한 menuRef.current 검토 없앰
    if (
      !menuRef.current ||
      menuRef.current.contains(e.target as Node) ||
      isModalOpen
    )
      return;
    setIsDropdownVisivle(false);
  };

  useEffect(() => {
    setIsUserAuthorizedToDelete(currentUser?.uid === userId);
    document.addEventListener("mousedown", handleMousedownOutside);
    return () => {
      document.removeEventListener("mousedown", handleMousedownOutside);
    };
  }, [currentUser?.uid, userId, isModalOpen]);

  return (
    <Wrapper>
      <div ref={menuRef} onClick={handleToggle}>
        <BsThreeDots />
        {isDropdownVisivle && (
          <DropDown
            isUserAuthorizedToDelete={isUserAuthorizedToDelete}
            id={docId}
            photo={photo}
            currentUser={currentUser}
          />
        )}
      </div>
    </Wrapper>
  );
}
