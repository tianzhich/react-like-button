/**
 * @Date: 2019-11-18 18:23:45
 * @LastEditors: Tian Zhi
 * @LastEditTime: 2019-11-21 21:27:41
 */
import styled, { css } from "styled-components";
import { textStyles } from "../utils";

const ClapCountTotal = styled.span`
  transform: scale(1);
  text-align: center;
  left: 0;
  ${textStyles}
  opacity: 0

  ${({ theme: { primaryColor, size } }) => css`
    top: -${size / 3}px;
    color: ${primaryColor};
    width: ${size}px;
  `}
`;

export default ClapCountTotal;
