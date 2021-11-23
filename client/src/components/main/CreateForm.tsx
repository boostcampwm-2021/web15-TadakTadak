import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import useInput from '@hooks/useInput';
import { postRoom } from '@src/apis';
import { useUser } from '@contexts/userContext';
import Select from '@components/common/Select';
import { adminOptions } from '@utils/utils';
import { RoomType } from './RoomList';

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
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.green};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 100%;
  color: white;
  border-radius: 1rem;
`;

enum RoomIndexType {
  타닥타닥 = 1,
  캠프파이어 = 2,
}

type OptionType = {
  value: number;
  label: string;
};

const roomOptions: OptionType[] = [
  { value: RoomIndexType.타닥타닥, label: '타닥타닥' },
  { value: RoomIndexType.캠프파이어, label: '캠프파이어' },
];

const CreateForm = (): JSX.Element => {
  const [roomTitle, onChangeRoomTitle] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [roomType, setRoomType] = useState(RoomIndexType[1]);
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
    const requestBody = {
      userId: user.id,
      title: roomTitle,
      description,
      maxHeadcount: +maxHeadcount,
      roomType,
    };
    const { isOk, data } = await postRoom(requestBody);
    if (isOk && data) {
      const { uuid } = data;
      const pathname = data.roomType === RoomType.tadak ? `/room/tadak/${uuid}` : `/room/campfire/${uuid}`;
      history.push(pathname, data);
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
          autoComplete="new-password"
        />
        <Input
          type="text"
          placeholder="방에 대한 설명을 입력해주세요.(선택)"
          id="description"
          onChange={onChangeDescription}
          maxLength={50}
          autoComplete="new-password"
        />
        <Select name={'방 유형'} options={roomOptions} onChange={handleRoomSelectChange} />
        <Select name={'인원'} options={adminOptions} onChange={handleAdminSelectChange} />
        <Button>생성 하기</Button>
      </Form>
    </Container>
  );
};

export default CreateForm;
