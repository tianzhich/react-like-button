import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactSVGElement
} from "react";
import mojs from "mo-js";
import { ThemeProvider } from "styled-components";
import ClapWrap from "./components/ClapWrap";
import ClapIcon, { IconProps } from "./components/ClapIcon";
import ClapButton from "./components/ClapButton";
import ClapCount from "./components/ClapCount";
import ClapCountTotal from "./components/ClapCountTotal";

interface ClapProps {
  count?: number;
  countTotal?: number;
  theme?: Record<string, any>;
  maxCount?: number;
  onCountChange?: (args: { count: number; countTotal: number }) => void;
  iconSVG?: (props: IconProps) => ReactSVGElement;
}

const defaultTheme = {
  primaryColor: "rgb(189, 195, 199)",
  secondaryColor: "rgb(39, 174, 96)",
  size: 70
};

const MAX_COUNT = 200;

const Clap: React.FC<ClapProps> = props => {
  const {
    count = 0,
    countTotal = 10,
    theme = {},
    maxCount = MAX_COUNT,
    onCountChange,
    iconSVG
  } = props;

  const [unClicked, setUnClicked] = useState(true);
  const [cnt, setCnt] = useState(count);
  const [cntTotal, setCntTotal] = useState(countTotal);
  const [isClicked, setIsClicked] = useState(count > 0);
  const [isHover, setIsHover] = useState(false);

  const clapButtonRef = useRef<HTMLButtonElement | null>(null);
  const clapCountRef = useRef<HTMLSpanElement | null>(null);
  const clapCountTotalRef = useRef<HTMLSpanElement | null>(null);

  const animationTimeline = useRef<any>();
  const animationTL = animationTimeline.current;

  // 初始化
  useEffect(() => {
    const tlDuration = 300;
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
        duration: tlDuration
      }
    });

    const circleBurst = new mojs.Burst({
      parent: clapButtonRef.current,
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
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
      duration: tlDuration
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: tlDuration / 2
    });

    const opacityStart = count > 0 && unClicked ? 1 : 0;

    const countTotalAnimation = new mojs.Html({
      el: clapCountTotalRef.current,
      isShowStart: false,
      isShowEnd: true,
      opacity: { [opacityStart]: 1 },
      delay: (3 * tlDuration) / 2,
      duration: tlDuration,
      y: { 0: -3 }
    });

    const scaleButton = new mojs.Html({
      el: clapButtonRef.current,
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.out
    });

    const clap = clapButtonRef.current;
    if (clap) clap.style.transform = "scale(1, 1)";
    animationTimeline.current = new mojs.Timeline();
    if (animationTL) {
      animationTL.add([
        countAnimation,
        countTotalAnimation,
        scaleButton,
        circleBurst,
        triangleBurst
      ]);
    }
  }, [animationTL, count, unClicked]);

  const getTheme = useCallback(() => {
    return Object.assign({}, defaultTheme, theme);
  }, [theme]);

  const onClick = useCallback(() => {
    if (animationTL) animationTL.replay();
    if (unClicked) {
      setUnClicked(false);
    }

    if (count < maxCount) {
      if (onCountChange)
        onCountChange({ count: count + 1, countTotal: countTotal + 1 });
      setCnt(prev => prev + 1);
      setCntTotal(prev => prev + 1);
      setIsClicked(true);
    }
  }, [animationTL, count, countTotal, maxCount, onCountChange, unClicked]);

  const onClickClear = useCallback(() => {
    if (onCountChange)
      onCountChange({ count: 0, countTotal: countTotal - count });
    setIsClicked(false);
    setCntTotal(prev => prev - cnt);
    setCnt(0);
  }, [cnt, count, countTotal, onCountChange]);

  return (
    <ThemeProvider theme={getTheme()}>
      <ClapWrap isClicked={isClicked} onClickClear={onClickClear}>
        <ClapButton
          ref={clapButtonRef}
          className="clap"
          onClick={onClick}
          onMouseEnter={e => setIsHover(true)}
          onMouseLeave={e => setIsHover(false)}
          isHover={isHover && count === 0}
        >
          <ClapIcon className="clap--icon" isClicked={isClicked} svgIcon={iconSVG} />
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
