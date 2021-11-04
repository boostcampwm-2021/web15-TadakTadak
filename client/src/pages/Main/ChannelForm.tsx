const ChannelForm = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const { setInCall, setChannelName } = props;

  return (
    <form className="channel-join">
      <input type="text" placeholder="채널 이름을 입력해주세요" onChange={(e) => setChannelName(e.target.value)} />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}>
        참가하기
      </button>
    </form>
  );
};

export default ChannelForm;
