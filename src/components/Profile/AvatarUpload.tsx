import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";

import { BiSolidUser } from "react-icons/bi";

const AvatarUploadLabel = styled.label`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarInput = styled.input`
  display: none;
`;

const AvatarImg = styled.img`
  width: 100%;
`;

interface IAvatarUploadProps {
  avatar: string | null;
  onAvatarChange: (file: File) => void;
}

const AvatarUpload = ({
  avatar,
  onAvatarChange,
}: PropsWithChildren<IAvatarUploadProps>) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length !== 1) return;
    const file = files[0];
    onAvatarChange(file);
  };

  return (
    <AvatarUploadLabel htmlFor="avatar">
      {avatar ? <AvatarImg src={avatar} /> : <BiSolidUser size="50" />}
      <AvatarInput
        id="avatar"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </AvatarUploadLabel>
  );
};

export default AvatarUpload;
