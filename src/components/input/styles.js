import { css } from "styled-components";

import { SIZE } from "./constants";

function getFont(props) {
  const { size } = props;

  switch (size) {
    default:
    case SIZE.default:
      return props.theme.typography.font300;
    case SIZE.compact:
      return props.theme.typography.font200;
    case SIZE.large:
      return props.theme.typography.font400;
  }
}

function getColors(props) {
  const { error, positive } = props;

  if (error) {
    return css`
      color: ${props => props.theme.colors.foreground};
      border-color: ${props => props.theme.colors.inputBorderError};
      background-color: ${props => props.theme.colors.inputFillError};
    `;
  } else if (positive) {
    return css`
      color: ${props => props.theme.colors.foreground};
      border-color: ${props => props.theme.colors.inputBorderPositive};
      background-color: ${props => props.theme.colors.inputFillPositive};
    `;
  } else {
    return css`
      color: ${props => props.theme.colors.foreground};
      border-color: ${props => props.theme.colors.inputFill};
      background-color: ${props => props.theme.colors.inputFill};
    `;
  }
}

export const getInputStyles = css`
  border-width: 2px;
  border-style: solid;
  outline: 0;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  width: 100%;
  :disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.inputFillDisabled};
    border-color: ${props => props.theme.colors.inputFillDisabled};
    color: ${props => props.theme.colors.inputTextDisabled};
  }
  :disabled::placeholder {
    color: ${props => props.theme.colors.inputTextDisabled};
  }
  :focus {
    background-color: ${props => props.theme.colors.inputFillActive};
    border-color: ${props => props.theme.colors.borderFocus};
    color: ${props => props.theme.colors.foreground};
  }
  ::placeholder {
    color: ${props => props.theme.colors.foregroundAlt};
  }
  border-radius: ${props => props.theme.borders.radius200};
  ${getFont};
  ${getColors};
`;
