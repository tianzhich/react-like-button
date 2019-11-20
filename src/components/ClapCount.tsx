/**
 * @Date: 2019-11-18 18:23:45
 * @LastEditors: Tian Zhi
 * @LastEditTime: 2019-11-19 16:36:20
 */
import styled, { css } from "styled-components";
import { textStyles } from "../utils";

const ClapCount = styled.span`
  top: -${({ theme: { size } }) => size / 1.6}px;
  left: ${({ theme: { size } }) => size / 4}px;
  color: white;
  border-radius: 50%;
  backface-visibility: hidden;
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
