import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Input, Button } from './style';
import Select from '@components/common/Select';
import Form from '@components/form/Form';
import { useUser } from '@contexts/userContext';
import { useToast } from '@hooks/useToast';
import useInput from '@hooks/useInput';
import { postRoom } from '@src/apis';
import { INPUT, RoomType, TOAST_MESSAGE, PLACEHOLDER_TXT, SELECT_TEXT } from '@utils/constant';
import { adminOptions } from '@utils/utils';
import { FORM } from '@utils/styleConstant';

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
  const [roomType, setRoomType] = useState<string>('');
  const [maxHeadcount, setMaxHeadcount] = useState('');
  const user = useUser();
  const toast = useToast();
  const history = useHistory();

  const handleRoomSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setRoomType((e.target[e.target.selectedIndex] as HTMLOptionElement).text);
  const handleAdminSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setMaxHeadcount((e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomTitle) return toast('error', TOAST_MESSAGE.emptyTitle);
    if (!roomType) return toast('error', TOAST_MESSAGE.emptyRoomType);
    if (!maxHeadcount) return toast('error', TOAST_MESSAGE.emptyHeadcount);
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
      return history.push(pathname, data);
    }
    toast('error', TOAST_MESSAGE.alreadyRoom);
  };

  return (
    <Container>
      <Form onSubmit={onSubmitForm} width={FORM.createWidth} height={FORM.createHeight}>
        <Input
          type="text"
          placeholder={PLACEHOLDER_TXT.roomTitle}
          onChange={onChangeRoomTitle}
          maxLength={INPUT.roomTitleMaxLen}
          autoComplete="new-password"
        />
        <Input
          type="text"
          placeholder={PLACEHOLDER_TXT.roomDiscrpt}
          onChange={onChangeDescription}
          maxLength={INPUT.roomDescMaxLen}
          autoComplete="new-password"
        />
        <Select name={SELECT_TEXT.roomType} options={roomOptions} onChange={handleRoomSelectChange} />
        <Select name={SELECT_TEXT.headCount} options={adminOptions} onChange={handleAdminSelectChange} />
        <Button>생성 하기</Button>
      </Form>
    </Container>
  );
};

export default CreateForm;
