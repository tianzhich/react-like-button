/**
 * @Date: 2019-11-18 18:23:45
 * @LastEditors: Tian Zhi
 * @LastEditTime: 2019-11-19 17:28:20
 */
import React, { CSSProperties, useCallback } from "react";
import { Transition } from "react-transition-group";
import styled, { css } from "styled-components";
import { rgba, darken } from "polished";
import { TransitionStatus } from "react-transition-group/Transition";

interface Props {
  isClicked?: boolean;
  onClick: () => void;
  in?: boolean;
}
type TransitionStyleFuncArgs = { isClicked?: boolean };
type TransitionStyles = {
  [k in TransitionStatus]?: (args: TransitionStyleFuncArgs) => CSSProperties;
};

const ClearClaps = styled.button<Props>`
  border: 0;
  padding: 0;
  appearance: none;
  position: absolute;
  right: 0;
  top: calc(50% - 15px);
  transform: translateX(0);
  height: 30px;
  width: 36px;
  border-radius: 0 9999px 9999px 0;
  backface-visibility: hidden;
  cursor: pointer;
  outline: none;
  transition: transform 0.3s cubic-bezier(0.25, 0, 0.6, 1.4) 1s,
    -webkit-transform 0.3s cubic-bezier(0.25, 0, 0.6, 1.4) 1s;

  &::before,
  &::after {
    content: "";
    position: absolute;
    right: calc(50% - 3.5px);
    top: calc(50% - 8px);
    height: 16px;
    width: 2px;
    border-radius: 9999px;
    transition: background 0.3s ease-in-out;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  ${({ theme: { primaryColor, secondaryColor } }) => css`
    background: ${rgba(secondaryColor, 0.1)};

    &::before,
    &::after {
      background: ${secondaryColor};
    }

    &:hover {
      &::before,
      &::after {
        background: ${darken(0.1, secondaryColor)};
      }
    }
  `}
`;

const transitionStyles: TransitionStyles = {
  entered: () => ({
    transform: "translateX(calc(100% - 5px))",
    transitionDelay: "0s"
  }),
  exiting: ({ isClicked }) => ({
    transitionDuration: isClicked ? "0.25s" : "0.3s",
    transitionDelay: isClicked ? "0s" : "0.7s"
  })
};

export default ({ in: inProp, ...props }: Props) => {
  const getStyles = useCallback((state: TransitionStatus) => {
    const func = transitionStyles[state];
    if (func) {
      return func(props);
    } else {
      return undefined
    }
  }, [props]);

  return (
    <Transition in={inProp} timeout={{ enter: 400 }}>
      {state => (
        <ClearClaps
          style={getStyles(state)}
          {...props}
        />
      )}
    </Transition>
  );
};
