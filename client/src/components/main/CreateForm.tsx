import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useInput from '@hooks/useInput';
import { postRoom } from '@utils/apis';
import { useUser } from '@contexts/userContext';
import Select from '@components/Select';
import { adminOptions } from '@utils/utils';

const Container = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 60%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 30rem;
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;

const Input = styled.input`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.green};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 100%;
  border-radius: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

enum RoomType {
  타닥타닥 = 1,
  캠프파이어 = 2,
}

type OptionType = {
  value: number;
  label: string;
};

const roomOptions: OptionType[] = [
  { value: RoomType.타닥타닥, label: '타닥타닥' },
  { value: RoomType.캠프파이어, label: '캠프파이어' },
];

const CreateForm = (): JSX.Element => {
  const [roomTitle, onChangeRoomTitle] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [roomType, setRoomType] = useState('');
  const [maxHeadcount, setMaxHeadcount] = useState('');
  const user = useUser();
  const history = useHistory();

  const handleRoomSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setRoomType((e.target[e.target.selectedIndex] as HTMLOptionElement).text);
  const handleAdminSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setMaxHeadcount((e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomTitle || !roomType || !maxHeadcount) {
      return;
    }
    const { isOk, data } = await postRoom({
      userId: user.id,
      title: roomTitle,
      description,
      maxHeadcount: +maxHeadcount,
      roomType,
    });
    if (isOk && data) {
      const { uuid } = data;
      history.push(`/room/${uuid}`, data);
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="방 제목을 입력해주세요."
          id="roomTitle"
          onChange={onChangeRoomTitle}
          maxLength={50}
          required={true}
        />
        <Input
          type="text"
          placeholder="방에 대한 설명을 입력해주세요.(선택)"
          id="description"
          onChange={onChangeDescription}
          maxLength={50}
        />
        <Select name={'방 유형'} options={roomOptions} onChange={handleRoomSelectChange} />
        <Select name={'인원'} options={adminOptions} onChange={handleAdminSelectChange} />
        <Button>생성 하기</Button>
      </Form>
    </Container>
  );
};

export default CreateForm;
