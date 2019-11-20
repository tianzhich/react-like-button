/**
 * @Date: 2019-11-18 18:23:45
 * @LastEditors: Tian Zhi
 * @LastEditTime: 2019-11-18 21:05:55
 */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ClearClaps from "./ClearClaps";

interface ClapWrap {
  isClicked?: boolean;
  onClickClear: () => void;
}

const Wrap = styled.div`
  display: inline-block;
  position: relative;
  z-index: 1;
`;

const ClapWrapChildren = styled.div`
  position: relative;
  z-index: 2;
`;

const ClapWrap: React.FC<ClapWrap> = props => {
  const { children, isClicked, onClickClear } = props;
  const [displayClear, setDisplayClear] = useState(false);
  const [clicked, setClicked] = useState<boolean>();

  const onClick = useCallback(() => {
    if (displayClear) setDisplayClear(false);
  }, [displayClear]);

  const mouseMove = useCallback(() => {
    if (!displayClear) setDisplayClear(true)
  }, [displayClear]);

  const mouseLeave = useCallback(() => {
    if (displayClear) setDisplayClear(false);
  }, [displayClear]);

  return (
    <Wrap
      onMouseLeave={mouseLeave}
      onClick={e => {
        setClicked(true)
        setTimeout(() => {
          setClicked(false);
        }, 100);
      }}
    >
      <ClapWrapChildren onMouseMove={mouseMove} onClick={onClick}>
        {children}
      </ClapWrapChildren>
      <ClearClaps
        onClick={onClickClear}
        in={displayClear && isClicked}
        isClicked={clicked}
      />
    </Wrap>
  );
};

export default ClapWrap;
