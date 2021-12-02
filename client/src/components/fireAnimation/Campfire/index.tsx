import './style.css';
import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import { useToast } from '@hooks/useToast';
import { TOAST_MESSAGE } from '@utils/constant';

const FireContainer = styled.div`
  width: 100vw;
  position: relative;
`;

interface FireAnimationProps {
  fireOn: boolean;
  setFireOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function FireAnimation({ setFireOn }: FireAnimationProps): JSX.Element {
  const [toggle, setToggle] = useState(true);
  const clicks = useRef(0);
  const toast = useToast();

  const onClickFire = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast('easterEggRoom', TOAST_MESSAGE.introFireAnimation);
  };
  const onClickMoon = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast('easterEggRoom', TOAST_MESSAGE.introMoon);
  };
  const onClickSmoke = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast('easterEggRoom', TOAST_MESSAGE.introEasterEgg2);
  };
  const onClickSky = () => toast('easterEggRoom', TOAST_MESSAGE.introSky);

  const handleToggle = () => {
    clicks.current += 1;
    setToggle((ps) => !ps);
    setFireOn(true);
    if (clicks.current > 19) {
      clicks.current = 1;
      toast('easterEggRoom', TOAST_MESSAGE.playingWithFire2);
      setTimeout(() => toast('easterEggRoom', '4초 뒤 폭파됩니다.'), 1000);
      setTimeout(() => toast('easterEggRoom', '3초 뒤 폭파됩니다.'), 2000);
      setTimeout(() => toast('easterEggRoom', '2초 뒤 폭파됩니다.'), 3000);
      setTimeout(() => toast('easterEggRoom', '1초 뒤 폭파됩니다.'), 4000);
      setTimeout(() => toast('easterEggRoom', '농담입니다ㅎ'), 6000);
    } else if (clicks.current > 9) toast('easterEggRoom', TOAST_MESSAGE.playingWithFire);
  };
  return (
    <FireContainer className={toggle ? 'fire-container' : 'fire-container fire-off'}>
      <div className="fire-on"></div>
      <div className="switch-wrap middle">
        <div id="switch" className={toggle ? '' : 'switched'} onClick={handleToggle}>
          <div id="circle"></div>
        </div>
      </div>
      <div className="section-center" onClick={onClickSky}>
        <div className="moon" onClick={onClickMoon}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="shooting-star"></div>
        <div className="shooting-star-2"></div>
        <div className="star"></div>
        <div className="star snd"></div>
        <div className="star trd"></div>
        <div className="star fth"></div>
        <div className="star fith"></div>
        <div className="circle"></div>
        <div className="wood-circle"></div>
        <div className="wood" onClick={onClickFire}></div>
        <div className="tree-1"></div>
        <div className="tree-2"></div>
        <div className="fire" onClick={onClickFire}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="smoke" onClick={onClickSmoke}>
          <span className="s-0"></span>
          <span className="s-1"></span>
          <span className="s-2"></span>
          <span className="s-3"></span>
          <span className="s-4"></span>
          <span className="s-5"></span>
          <span className="s-6"></span>
          <span className="s-7"></span>
          <span className="s-8"></span>
          <span className="s-9"></span>
        </div>
      </div>
    </FireContainer>
  );
}

export default FireAnimation;
