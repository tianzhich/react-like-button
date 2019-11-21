/**
 * @Date: 2019-11-18 18:23:45
 * @LastEditors: Tian Zhi
 * @LastEditTime: 2019-11-21 21:27:09
 */
import styled, { css } from "styled-components";
import { textStyles } from "../utils";

const ClapCount = styled.span`
  top: -${({ theme: { size } }) => size / 1.6}px;
  left: ${({ theme: { size } }) => size / 4}px;
  color: white;
  border-radius: 50%;
  backface-visibility: hidden;
  opacity: 0;
  ${textStyles}

  ${({ theme: { secondaryColor, size } }) => {
    const half = `${size / 2}px`;
    return css`
      height: ${half};
      width: ${half};
      line-height: ${half};
      top: -${size / 2}px;
      left: ${size / 4}px;
      background: ${secondaryColor};
    `;
  }}
`;

export default ClapCount;
