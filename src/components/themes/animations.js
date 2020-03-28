import { keyframes, css } from "styled-components";

const bounceIn = keyframes`
  0% {
    opacity: 0.9;
    transform: scale3d(.98, .98, .98);
  }
  70% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
`;

const animations = {
  bounceIn: css`
    ${bounceIn} 240ms cubic-bezier(0.215, 0.61, 0.355, 1);
  `
};

export default animations;
