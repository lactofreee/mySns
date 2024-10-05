import { styled } from "styled-components";
import { LuPencil } from "react-icons/lu";
import Modal from "./Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTweet, modalState, tweetToUpdate } from "../../../Atom/atom";
import UpdatePostModal from "./updatePostModal";
import { db } from "../../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
const EditBtn = styled.label`
  color: white;
  cursor: pointer;
  display: contents;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditTweet = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const newTweetObj = useRecoilValue(tweetToUpdate);
  const tweetObj = useRecoilValue(currentTweet);
  const tweetId = tweetObj?.id || "";

  if (!tweetId) {
    // console.error("Invalid tweet ID");
    return;
  }
  const tweetRef = doc(db, "tweets", tweetId);

  const onAccept = async () => {
    if (!newTweetObj) return;
    try {
      await updateDoc(tweetRef, {
        tweet: newTweetObj.tweet,
        photo: newTweetObj.preview,
      });
      closeModal();
    } catch (error) {
      console.error(`Error updating document: `, error);
    }
  };

  return (
    <>
      <EditBtn onClick={openModal}>
        <LuPencil />
        수정
      </EditBtn>
      <Modal isOpen={isModalOpen}>
        <Wrapper>
          <Buttons>
            <button onClick={closeModal}>Close</button>
            <button onClick={onAccept}>Accept</button>
          </Buttons>
          <UpdatePostModal />
        </Wrapper>
      </Modal>
    </>
  );
};

export default EditTweet;
