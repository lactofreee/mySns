import { styled } from "styled-components";

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
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1da1f2;
  }
`;

interface ITextBoxProps {
  onTextInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  tweet: string;
}

const TextBox = ({ onTextInputChange, tweet }: ITextBoxProps) => {
  return (
    <TextArea
      required
      rows={5}
      maxLength={180}
      onChange={onTextInputChange}
      value={tweet}
      placeholder="무슨 일이 일어나고 있나요?"
    />
  );
};

export default TextBox;
