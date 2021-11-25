import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { postRoom } from '@src/apis';
import Select from '@components/common/Select';
import Form from '@components/common/Form';
import { adminOptions } from '@utils/utils';
import { INPUT, RoomType } from '@utils/constant';
import { FORM } from '@utils/styleConstant';
import useInput from '@hooks/useInput';
import { useUser } from '@contexts/userContext';

const Container = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 60%;
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

type OptionType = {
  value: number;
  label: string;
};

const roomOptions: OptionType[] = [
  { value: 1, label: RoomType.tadak },
  { value: 2, label: RoomType.campfire },
];

const CreateForm = (): JSX.Element => {
  const [roomTitle, onChangeRoomTitle] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [roomType, setRoomType] = useState<string>(RoomType.tadak);
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
      <Form onSubmit={onSubmitForm} width={FORM.createWidth} height={FORM.createHeight}>
        <Input
          type="text"
          placeholder="방 제목을 입력해주세요."
          id="roomTitle"
          onChange={onChangeRoomTitle}
          maxLength={INPUT.roomTitleMaxLen}
          required={true}
          autoComplete="new-password"
        />
        <Input
          type="text"
          placeholder="방에 대한 설명을 입력해주세요.(선택)"
          id="description"
          onChange={onChangeDescription}
          maxLength={INPUT.roomDescMaxLen}
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
