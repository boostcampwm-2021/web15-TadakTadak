import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useInput from '@hooks/useInput';
import ReactSelect, { StylesConfig, SingleValue } from 'react-select';
import { postRoom } from '@utils/apis';
import { useUser } from '@contexts/userContext';

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
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
`;

const customStyles: StylesConfig = {
  menu: (provided) => ({
    ...provided,
    padding: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : '#00C9C8',
    fontFamily: 'monospace',
    fontWeight: 1000,
  }),
  control: () => ({
    width: 200,
  }),
};

enum RoomType {
  타닥타닥 = 1,
  캠프파이어 = 2,
  코딩라이브 = 3,
}

type OptionType = {
  value: number;
  label: string;
};

const selectOptions: OptionType[] = [
  { value: RoomType.타닥타닥, label: '타닥타닥' },
  { value: RoomType.캠프파이어, label: '캠프파이어' },
  { value: RoomType.코딩라이브, label: '코딩라이브' },
];

const CreateForm = (): JSX.Element => {
  const [roomTitle, onChangeRoomTitle] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [maxHeadcount, onChangeMaxHeadcount] = useInput('');
  const [roomType, setRoomType] = useState<string | undefined>('타닥타닥');
  const user = useUser();
  const history = useHistory();

  const handleSelectChange = (newValue: SingleValue<OptionType>): void => setRoomType(newValue?.label);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomTitle || !roomType || !maxHeadcount) {
      return;
    }
    const { status, data } = await postRoom({
      userId: user.id,
      title: roomTitle,
      description,
      maxHeadcount: +maxHeadcount,
      roomType,
    });
    if (status === 201) {
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
        <ReactSelect defaultValue={selectOptions[0]} options={selectOptions} onChange={handleSelectChange} />
        <Input
          type="number"
          placeholder="제한 인원을 지정해주세요."
          id="maxHeadcount"
          onChange={onChangeMaxHeadcount}
          required={true}
        />
        <Button>생성 하기</Button>
      </Form>
    </Container>
  );
};

export default CreateForm;
