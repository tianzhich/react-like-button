/**
 * @Date: 2019-11-18 20:51:04
 * @LastEditors: Tian Zhi
 * @LastEditTime: 2019-11-21 20:46:50
 */
import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import styled from "styled-components";

const ButtonWrap = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

ReactDOM.render(
  <ButtonWrap>
    <Button />
  </ButtonWrap>,
  document.getElementById("root")
);

export default Button;
