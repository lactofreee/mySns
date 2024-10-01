import { styled } from "styled-components";

import { TbPhoto } from "react-icons/tb";

const AttachFileBtn = styled.label`
  color: #1da1f2;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

interface IHandleTweetImgProps {
  tweetImg : File|null;
  onImgChange : (event:React.ChangeEvent<HTMLInputElement>)=>void;
}

const TweetImgInput = ({ tweetImg, onImgChange }: IHandleTweetImgProps) => {
  return (
    <>
      <AttachFileBtn htmlFor="file">
        {tweetImg ? "사진 바꾸기" : <TbPhoto size="25px" />}
      </AttachFileBtn>
      <AttachFileInput
        onChange={onImgChange}
        type="file"
        id="file"
        accept="image/*"
      />
    </>

  );
};
    
export default TweetImgInput;
