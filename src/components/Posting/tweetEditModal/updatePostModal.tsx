import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentTweet, tweetToUpdate } from "../../../Atom/atom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextBox from "../textArea";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 5.5fr;
  gap: 20px;
`;

const ImgBox = styled.div`
  display: flex;
  background-color: black;
  border-radius: 10px;
  padding: 0px 10px;
  height: 700px;
  justify-content: center;
  align-items: center;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 15px;
`;

const AttachFileBtn = styled.label`
  color: #1da1f2;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const UpdatePostModal = () => {
  const [tweet, setTweet] = useState("");
  const tweetObj = useRecoilValue(currentTweet);
  const id = tweetObj.id;
  const photo = tweetObj.photo;
  const [preview, setPreview] = useState(photo);
  const tweetRef = doc(db, "tweets", id);

  const getTweet = async () => {
    const tweetSnap = await getDoc(tweetRef);
    if (!tweetSnap) return;
    setTweet(tweetSnap.data()?.tweet);
  };

  useEffect(() => {
    getTweet();
  }, []);

  const onTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onPreviewImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const setNewTweet = useSetRecoilState(tweetToUpdate);
  useEffect(() => {
    setNewTweet({ tweet, preview });
  }, [tweet, preview, setNewTweet]);

  return (
    <Wrapper>
      <TextBox onTextInputChange={onTextInputChange} tweet={tweet} />
      <AttachFileBtn htmlFor="previewImg">
        <ImgBox>{preview ? <Photo src={preview} /> : "사진 고르기"}</ImgBox>
        <AttachFileInput
          onChange={onPreviewImgChange}
          type="file"
          id="previewImg"
          accept="image/*"
        />
      </AttachFileBtn>
    </Wrapper>
  );
};

export default UpdatePostModal;
