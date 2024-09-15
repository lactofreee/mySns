import { styled } from "styled-components";

const Btn = styled.input`
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

interface ISubmitBtnProps {
  isLoading: boolean;
}

const SubmitBtn = ({isLoading}:ISubmitBtnProps) => {
  return (
    <Btn type="submit" value={isLoading ? "게시중..." : "게시하기"}/>
  );
};

export default SubmitBtn;