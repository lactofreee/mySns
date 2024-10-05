import styled from "styled-components";
import { auth, db, storage } from "../firebase/firebase";
import React, { useEffect, useId, useRef, useState } from "react";

import { RiEditLine } from "react-icons/ri";
import { updateProfile } from "firebase/auth";
import Tweet from "../components/Posting/tweet";
import UpdateMultipleDocuments from "../utils/updateMultipleDocuments";
import {
  fetchUserTweets,
} from "../utils/firebaseUtils";
import AvatarUpload from "../components/Profile/AvatarUpload";
import { useAvatar } from "../hooks/useAvatar";

const Wrapper = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Name = styled.span`
  font-size: 18px;
`;

const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
  border-left: 1px solid #2f3336;
  border-right: 1px solid #2f3336;
`;

const NameEditInput = styled.input`
  font-size: 18px;
  border: 0;
  background: transparent;
  width: 100px;
  color: white;
  outline: none;
`;

const NameEditForm = styled.form``;

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding-left: 30px;
  margin-bottom: 20px;
`;

const Profile = () => {
  const user = auth.currentUser;
  const [tweets, setTweets] = useState<any[]>([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [inputName, setInputName] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { avatar, handleAvatarChange } = useAvatar();

  useEffect(() => {
    if (!user) return;
    try {
      fetchUserTweets(user.uid, db).then(setTweets);
    } catch (error) {
      console.error("Failed to fetch tweets:", error);
    }
  }, [user]);

  const startNameEdit = () => {
    setIsEditingName(true);
  };

  // 외부 클릭 시 이름 변경 모드 종료
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsEditingName(false);
      }
    };

    if (isEditingName) {
      document.addEventListener("click", handleClickOutside);
      nameInputRef.current?.focus();
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditingName]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && user) {
      e.preventDefault();

      try {
        await updateProfile(user, {
          displayName: inputName,
        });
        setIsEditingName(false);
        UpdateMultipleDocuments(user.uid, inputName);
        alert("name changed!");
      } catch (error) {
        console.error(`can not change name error: `, error);
      }
    }
  };

  return (
    <Wrapper>
      <AvatarUpload avatar={avatar} onAvatarChange={handleAvatarChange} />
      <Container ref={containerRef}>
        {isEditingName ? (
          <NameEditForm>
            <NameEditInput
              ref={nameInputRef}
              type="text"
              maxLength={25}
              defaultValue={`${user?.displayName ?? "Anonymous"}`}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={handleKeyDown}
            ></NameEditInput>
          </NameEditForm>
        ) : (
          <Name>{user?.displayName ?? "Anonymous"}</Name>
        )}
        <RiEditLine color="#959595" onClick={startNameEdit} cursor="pointer" />
      </Container>
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.docId} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
};

export default Profile;
