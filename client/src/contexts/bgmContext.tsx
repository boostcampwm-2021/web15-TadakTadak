import React, { useCallback, useContext, useState } from 'react';

const campfireSoundPath = '/campfire-sound.mp3';

interface PlayFnProps {
  togglePlay: () => void;
}

interface BGMContextProps {
  isPlay: boolean;
  fn: PlayFnProps;
}

export const BGMContext = React.createContext<BGMContextProps>({ isPlay: false, fn: { togglePlay: () => {} } });

const BGMContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isPlay, setIsPlay] = useState(false);
  const togglePlay = useCallback(() => {
    setIsPlay((prevState) => !prevState);
  }, [setIsPlay]);

  return (
    <BGMContext.Provider value={{ isPlay, fn: { togglePlay } }}>
      {children}
      {isPlay && <audio src={campfireSoundPath} autoPlay={true}></audio>}
    </BGMContext.Provider>
  );
};

export const usePlayBgm = (): boolean => {
  const { isPlay } = useContext(BGMContext);
  return isPlay;
};

export const usePlayBgmFns = (): PlayFnProps => {
  const { fn } = useContext(BGMContext);
  return fn;
};

export default BGMContextProvider;
