import React, { useState, useRef, useEffect, useCallback } from "react";
import mojs from "mo-js";
import { ThemeProvider } from "styled-components";
import ClapWrap from "./components/ClapWrap";
import ClapIcon from "./components/ClapIcon";
import ClapButton from "./components/ClapButton";
import ClapCount from "./components/ClapCount";
import ClapCountTotal from "./components/ClapCountTotal";

interface ClapProps {
  clicked?: boolean;
  count?: number;
  countTotal?: number;
  theme?: Record<string, any>;
  maxCount?: number;
  onCountChange?: (args: { count: number; countTotal: number }) => void;
  iconComponent?: typeof ClapIcon;
}

const MAX_COUNT = 200;
const COUNT = 0;
const COUNT_TOTAL = 0;
const DEFAULT_ICON = ClapIcon;
const DEFAULT_THEME = {
  primaryColor: "rgb(189, 195, 199)",
  secondaryColor: "rgb(39, 174, 96)",
  size: 70
};
const TL_DURATION = 300;
const DEFAULT_CLICKED = false;

const Clap: React.FC<ClapProps> = props => {
  const {
    count = COUNT,
    countTotal = COUNT_TOTAL,
    theme = DEFAULT_THEME,
    maxCount = MAX_COUNT,
    onCountChange,
    iconComponent = DEFAULT_ICON,
    clicked = DEFAULT_CLICKED
  } = props;
  const IconClap = iconComponent;

  const [cnt, setCnt] = useState(count >= 0 ? count : 0);
  const [cntTotal, setCntTotal] = useState(countTotal > 0 ? countTotal : 0);
  const [isClicked, setIsClicked] = useState(clicked);
  const [isHover, setIsHover] = useState(false);

  const clapButtonRef = useRef<HTMLButtonElement | null>(null);
  const clapCountRef = useRef<HTMLSpanElement | null>(null);
  const clapCountTotalRef = useRef<HTMLSpanElement | null>(null);

  const animationTimeline = useRef<any>();
  const animationTL = animationTimeline.current;

  // 初始化
  useEffect(() => {
    const triangleBurst = new mojs.Burst({
      parent: clapButtonRef.current,
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: "polygon",
        radius: { 6: 0 },
        scale: 1,
        stroke: "rgba(211,84,0 ,0.5)",
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: TL_DURATION
      }
    });

    const circleBurst = new mojs.Burst({
      parent: clapButtonRef.current,
      radius: { 50: 75 },
      angle: 25,
      duration: TL_DURATION,
      children: {
        shape: "circle",
        fill: "rgba(149,165,166 ,0.5)",
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    });

    const countAnimation = new mojs.Html({
      el: clapCountRef.current,
      isShowStart: false,
      isShowEnd: true,
      y: { 0: -30 },
      opacity: { 0: 1 },
      duration: TL_DURATION
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: TL_DURATION / 2
    });

    const countTotalAnimation = new mojs.Html({
      el: clapCountTotalRef.current,
      isShowStart: false,
      isShowEnd: true,
      opacity: { 0: 1 },
      delay: (3 * TL_DURATION) / 2,
      duration: TL_DURATION,
      y: { 0: -3 }
    });

    const scaleButton = new mojs.Html({
      el: clapButtonRef.current,
      duration: TL_DURATION,
      scale: { 1.3: 1 },
      easing: mojs.easing.out
    });

    const clap = clapButtonRef.current;
    if (clap) clap.style.transform = "scale(1, 1)";
    animationTimeline.current = new mojs.Timeline();
    if (animationTimeline.current) {
      animationTimeline.current.add([
        countAnimation,
        countTotalAnimation,
        scaleButton,
        circleBurst,
        triangleBurst
      ]);
    }
  }, [clicked]);

  const onClick = useCallback(() => {
    if (animationTL) animationTL.replay();

    if (count < maxCount) {
      if (onCountChange)
        onCountChange({ count: count + 1, countTotal: countTotal + 1 });
      setCnt(prev => prev + 1);
      setCntTotal(prev => prev + 1);
      setIsClicked(true);
    }
  }, [animationTL, count, countTotal, maxCount, onCountChange]);

  const onClickClear = useCallback(() => {
    if (onCountChange)
      onCountChange({ count: 0, countTotal: countTotal - count });
    setIsClicked(false);
    setCntTotal(prev => prev - cnt);
    setCnt(0);
  }, [cnt, count, countTotal, onCountChange]);

  return (
    <ThemeProvider theme={theme}>
      <ClapWrap isClicked={isClicked} onClickClear={onClickClear}>
        <ClapButton
          ref={clapButtonRef}
          className="clap"
          onClick={onClick}
          onMouseEnter={e => setIsHover(true)}
          onMouseLeave={e => setIsHover(false)}
          isHover={isHover && count === 0}
        >
          <IconClap className="clap--icon" isClicked={isClicked} />
          <ClapCount ref={clapCountRef} className="clap--count">
            +{cnt}
          </ClapCount>
          <ClapCountTotal ref={clapCountTotalRef} className="clap--count-total">
            {Number(cntTotal).toLocaleString()}
          </ClapCountTotal>
        </ClapButton>
      </ClapWrap>
    </ThemeProvider>
  );
};

export default Clap;
