import { styled } from "styled-components";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 24px; /* 버튼 아래에 위치시킵니다. */
  right: 0;
  background-color: #000000;
  border: 0px solid #ccc;
  border-radius: 12px;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px,
    rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
  width: 180px;
  z-index: 1000;
  padding: 14px 20px;
  gap: 18px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const DeleteBtn = styled.label`
  color: #f4222f;
  cursor: pointer;
  display: contents;
`;

export default function DropDown({ canDelete }: { canDelete: boolean }) {
  return (
    <Wrapper>
      {canDelete ? (
        <Container>
          <DeleteBtn>
            <FaRegTrashAlt />
            삭제하기
          </DeleteBtn>
        </Container>
      ) : null}
      <Container>
        <LuPencil />
        수정
      </Container>
    </Wrapper>
  );
}
