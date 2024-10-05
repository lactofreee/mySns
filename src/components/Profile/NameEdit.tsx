import { PropsWithChildren, useEffect, useRef } from "react";
import { styled } from "styled-components";

import { RiEditLine } from "react-icons/ri";

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding-left: 30px;
  margin-bottom: 20px;
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

const Name = styled.span`
  font-size: 18px;
`;

interface INameEditProps {
  name: string;
  isEditing: boolean;
  onStartEdit: () => void;
  onNameChange: (newName: string) => void;
  onCancelEdit: () => void;
}

const NameEdit = ({
  name,
  isEditing,
  onStartEdit,
  onNameChange,
  onCancelEdit,
}: PropsWithChildren<INameEditProps>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        onCancelEdit();
    };

    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
      inputRef.current?.focus();
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, onCancelEdit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitNameChange();
    }
  };

  const submitNameChange = () => {
    const newName = inputRef.current?.value;
    if (newName && newName !== name) {
      onNameChange(newName);
    } else {
      onCancelEdit();
    }
  };

  return (
    <Container ref={containerRef}>
      {isEditing ? (
        <NameEditForm>
          <NameEditInput
            ref={inputRef}
            type="text"
            maxLength={25}
            defaultValue={name}
            onKeyDown={handleKeyDown}
          ></NameEditInput>
        </NameEditForm>
      ) : (
        <Name>{name}</Name>
      )}
      <RiEditLine color="#959595" onClick={onStartEdit} cursor="pointer" />
    </Container>
  );
};

export default NameEdit;
