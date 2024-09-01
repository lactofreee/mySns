import React, { useState } from "react";
import styled from "styled-components";

import { TbPhoto } from "react-icons/tb";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 1px solid #2f3336;
  padding: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1da1f2;
  }
`;

const AttachFileBtn = styled.label`
  color: #1da1f2;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  color: white;
  background-color: #1da1f2;
  border: 1px solid #1da1f2;
  border-radius: 20px;
  font-size: 16px;
  padding: 8px 0px 4px 0px;
  width: 90px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const SubmitConatiner = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
`;

const PostTweetForm = () => {
  const IMAGE_MAX_SIZE = 1 * 1024 * 1024; //  1MB
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      files[0].size <= IMAGE_MAX_SIZE
        ? setFile(files[0])
        : alert("용량이 너무 큽니다.");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onTextInputChange}
        value={tweet}
        placeholder="무슨 일이 일어나고 있나요?"
      />
      <SubmitConatiner>
        <AttachFileBtn htmlFor="file">
          {file ? "사진 바꾸기" : <TbPhoto size="25px" />}
        </AttachFileBtn>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          id="file"
          accept="image/*"
        />
        <SubmitBtn type="submit" value={isLoading ? "게시중..." : "게시하기"} />
      </SubmitConatiner>
    </Form>
  );
};
export default PostTweetForm;
