/**
 * @Date: 2019-11-21 11:38:17
 * @LastEditors: Tian Zhi
 * @LastEditTime: 2019-11-21 18:19:45
 */
import React, { ReactSVGElement } from "react";
import styled, { css } from "styled-components";
import { storiesOf } from "@storybook/react";
import { ThumbsUp } from "react-feather";
import centered from "@storybook/addon-centered";
import ClapButton from "../src";

const CustomIcon = <ThumbsUp /> as ReactSVGElement;

const stories = storiesOf("LikeButton", module);

stories
  .addDecorator(centered)
  .add("default", () => <ClapButton />)
  .add("maxCount", () => <ClapButton maxCount={3} countTotal={5005} />)
  .add("count", () => <ClapButton countTotal={5005} count={3} />)
  .add("icon", () => (
    <ClapButton iconSVG={() => CustomIcon} />
  ))
  .add("color", () => <ClapButton theme={{ secondaryColor: "#5f27ae" }} />)
  .add("canSwitch", () => <ClapButton countTotal={5005} />);
