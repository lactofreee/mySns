import { styled } from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";

import { deleteObject, ref } from "firebase/storage";
import { User } from "firebase/auth";
import EditTweet from "../components/Posting/tweetEditModal/editTweet";
import { useSetRecoilState } from "recoil";
import { currentTweet } from "../Atom/atom";
import { useEffect } from "react";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 24px; /* 버튼 아래에 위치시킵니다. */
  right: 0;
  background-color: #000000;
  border: 0px solid #ccc;
  border-radius: 12px;
  box-shadow:
    rgba(255, 255, 255, 0.2) 0px 0px 15px,
    rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
  width: 180px;
  z-index: 100;
  padding: 14px 20px;
  gap: 18px;
  font-weight: 600;
  cursor: default;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DeleteBtn = styled.label`
  color: #f4222f;
  cursor: pointer;
  display: contents;
`;

export interface DropDownProps {
  isUserAuthorizedToDelete: boolean;
  id: string;
  photo: string;
  currentUser: User | null;
}

export default function DropDown({
  currentUser,
  isUserAuthorizedToDelete,
  id,
  photo,
}: DropDownProps) {
  const setCurrentTweet = useSetRecoilState(currentTweet);
  useEffect(() => {
    setCurrentTweet({
      currentUser,
      id,
      photo,
      isUserAuthorizedToDelete,
    });
  }, [currentUser, id, isUserAuthorizedToDelete, photo, setCurrentTweet]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onDelete = async () => {
    const tweetRef = doc(db, "tweets", id);
    const ok = confirm("이 트윗을 삭제하시겠습니까?");
    if (!ok || !isUserAuthorizedToDelete || tweetRef === null) return;
    try {
      await deleteDoc(tweetRef!);
      if (photo) {
        const photoRef = ref(storage, `tweets/${currentUser?.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper onClick={handleClick}>
      {isUserAuthorizedToDelete ? (
        <Container>
          <DeleteBtn onClick={onDelete}>
            <FaRegTrashAlt />
            삭제
          </DeleteBtn>
        </Container>
      ) : null}
      <Container>
        <EditTweet />
      </Container>
    </Wrapper>
  );
}
