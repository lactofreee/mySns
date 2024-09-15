import React, { useState } from "react";
import styled from "styled-components";

import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import TweetImgInput from "./tweetImgInput";
import SubmitBtn from "./submitBtn";
import TextBox from "./textArea";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  const [tweetImg, setTweetImg] = useState<File | null>(null);

  const onTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  // 입력값을 text area에 등록하는 기능

  const onImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      files[0].size <= IMAGE_MAX_SIZE
        ? setTweetImg(files[0])
        : alert("용량이 너무 큽니다.");
    }
  };
  // 이미지 파일을 필드에 등록하는 기능

  const createTweetDoc = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("user not found");

    return await addDoc(collection(db, "tweets"), {
      tweet,
      createdAt: Date.now(),
      username: user.displayName || "Anonymous",
      userId: user.uid,
    });
  };
  // 트윗 생성하는 기능

  const createTweetImgUrl = async (docId: string) => {
    if (!tweetImg) return;
    const locationRef = ref(
      storage,
      `tweets/${auth.currentUser!.uid}/${docId}`,
    );
    const result = await uploadBytes(locationRef, tweetImg);
    return await getDownloadURL(result.ref);
  };
// 트윗이미지가 프리뷰상태일때 firestore 업로드에 필요한 url 생성

  
  const onTweetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || tweet === "" || tweet.length > 180) return;
    setLoading(true);
    try {
      const docRef = await createTweetDoc();
      if (tweetImg) {
       const tweetImgUrl = createTweetImgUrl(docRef.id)
        await updateDoc(docRef, { photo: tweetImgUrl });
      }
      // 등록된 이미지 파일과 트윗을 firebase에 업로드 하는 기능
      setTweet("");
      setTweetImg(null);
      // 트윗과 이미지 필드를 초기화
    } catch (error) {
      console.log(error);
      // 에러 처리
    } finally {
      setLoading(false);
      // 로딩 상태 초기화
    }
  };
  return (
    <Form onSubmit={onTweetSubmit}>
      <TextBox onTextInputChange={onTextInputChange} tweet={tweet} />
      <SubmitConatiner>
        <TweetImgInput tweetImg={tweetImg} onImgChange={onImgChange} />
        <SubmitBtn isLoading={isLoading} />
      </SubmitConatiner>
    </Form>
  );
};
export default PostTweetForm;
