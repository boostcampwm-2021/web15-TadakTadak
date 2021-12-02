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
  const handleToggle = () => {
    clicks.current += 1;
    setToggle((ps) => !ps);
    setFireOn(true);
    if (clicks.current > 5) toast('easterEgg', TOAST_MESSAGE.playingWithFire);
  };
  return (
    <FireContainer className={toggle ? 'fire-container' : 'fire-container fire-off'}>
      <div className="fire-on"></div>
      <div className="switch-wrap middle">
        <div id="switch" className={toggle ? '' : 'switched'} onClick={handleToggle}>
          <div id="circle"></div>
        </div>
      </div>
      <div className="section-center">
        <div className="moon">
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
        <div className="wood"></div>
        <div className="tree-1"></div>
        <div className="tree-2"></div>
        <div className="fire">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="smoke">
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
