import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
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
  ${({ theme }) => theme.flexCenter}
  margin-top: ${({ theme }) => theme.margins.lg};
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  margin: ${({ theme }) => theme.margins.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  ::placeholder {
    padding-left: ${({ theme }) => theme.margins.lg};
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.base}; ;
`;

enum RoomType {
  타닥타닥 = 1,
  캠프파이어 = 2,
  코딩라이브 = 3,
}

type OptionType = {
  value: number;
  label: string;
};

const roomOptions: OptionType[] = [
  { value: RoomType.타닥타닥, label: '타닥타닥' },
  { value: RoomType.캠프파이어, label: '캠프파이어' },
  { value: RoomType.코딩라이브, label: '코딩라이브' },
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
    const { statusCode, data } = await postRoom({
      userId: user.id,
      title: roomTitle,
      description,
      maxHeadcount: +maxHeadcount,
      roomType,
    });
    if (statusCode === 201) {
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
