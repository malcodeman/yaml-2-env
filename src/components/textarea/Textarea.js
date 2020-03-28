import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SIZE } from "./constants";
import { getInputStyles } from "./styles";

const StyledTextarea = styled.textarea`
  resize: none;
  ${getInputStyles};
`;

function Textarea(props) {
  const {
    size,
    value,
    placeholder,
    disabled,
    error,
    positive,
    onChange
  } = props;

  return (
    <StyledTextarea
      {...props}
      size={size}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      positive={positive}
      onChange={onChange}
    />
  );
}

Textarea.propTypes = {
  size: PropTypes.oneOf([SIZE.default, SIZE.compact, SIZE.large]),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  positive: PropTypes.bool,
  onChange: PropTypes.func
};

Textarea.defaultProps = {
  size: SIZE.default,
  value: "",
  placeholder: "",
  disabled: false,
  error: false,
  positive: false,
  onChange: () => {}
};

export default Textarea;
