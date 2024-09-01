import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import DropDown from "./dropdown";
import { styled } from "styled-components";
import { MeatballMenuProps } from "../components/Posting/tweet";

const Wrapper = styled.div`
  color: white;
  cursor: pointer;
  position: relative;
  display: flex;
`;

export default function MeatballMenu({
  currentUser,
  userId,
  id,
  photo,
}: MeatballMenuProps) {
  const [view, setView] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [canDelete, setCanDelete] = useState(false);

  // 외부 클릭 감지 함수
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setView(false);
    }
  };

  useEffect(() => {
    if (currentUser?.uid === userId) {
      setCanDelete(true);
    }

    // 마운트 시 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <div
        ref={menuRef}
        onClick={() => {
          setView(!view);
        }}
      >
        <BsThreeDots />
        {view && (
          <DropDown
            canDelete={canDelete}
            id={id}
            photo={photo}
            currentUser={currentUser}
          />
        )}
      </div>
    </Wrapper>
  );
}
