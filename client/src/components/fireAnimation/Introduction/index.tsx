import './style.css';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useToast } from '@hooks/useToast';
import { TOAST_MESSAGE } from '@utils/constant';

const FireContainer = styled.div`
  width: 100vw;
  position: relative;
`;

interface FireAnimationProps {
  setFireOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function FireAnimation({ setFireOn }: FireAnimationProps): JSX.Element {
  const [toggle, setToggle] = useState(false);
  const toast = useToast();

  const onClickFire = () => toast('easterEgg', TOAST_MESSAGE.introEasterEgg);
  const onClickWoods = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast('easterEgg', TOAST_MESSAGE.introEasterEgg2);
  };

  const handleToggle = () => {
    setToggle((ps) => !ps);
    setFireOn(true);
  };
  return (
    <FireContainer className={toggle ? 'fire-container' : 'fire-container fire-off'}>
      <div className="fire-on"></div>
      <div className="switch-wrap">
        <div id="switch" className={toggle ? '' : 'switched'} onClick={handleToggle}>
          <div id="circle"></div>
        </div>
      </div>
      <div className="section-center" onClick={onClickFire}>
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
        <div className="wood" onClick={onClickWoods}></div>
        <div className="tree-1"></div>
        <div className="tree-2"></div>
        <div className="fire" onClick={onClickWoods}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="smoke" onClick={onClickWoods}>
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
