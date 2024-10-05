import styled from "styled-components";

import AvatarUpload from "../components/Profile/AvatarUpload";
import { useAvatar } from "../hooks/useAvatar";
import NameEdit from "../components/Profile/NameEdit";
import { useNameEdit } from "../hooks/useNameEdit";
import TweetList from "../components/Profile/TweetList";
import { useTweets } from "../hooks/useTweets";

const Wrapper = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Profile = () => {
  const { avatar, handleAvatarChange } = useAvatar();
  const {
    name,
    isEditingName,
    startNameEdit,
    handleNameChange,
    cancelNameEdit,
  } = useNameEdit();
  const { tweets } = useTweets();

  return (
    <Wrapper>
      <AvatarUpload avatar={avatar} onAvatarChange={handleAvatarChange} />
      <NameEdit
        name={name}
        isEditing={isEditingName}
        onStartEdit={startNameEdit}
        onNameChange={handleNameChange}
        onCancelEdit={cancelNameEdit}
      ></NameEdit>
      <TweetList tweets={tweets} />
    </Wrapper>
  );
};

export default Profile;
