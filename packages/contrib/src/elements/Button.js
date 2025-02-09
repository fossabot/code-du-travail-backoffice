import React from "react";
import { Button as _Button } from "rebass";
import styled from "styled-components";

import Icon from "./Icon";

const Button = styled(_Button)`
  background-color: ${({ color, hasText }) =>
    !hasText ? "transparent" : color};
  border-radius: 0.125rem;
  color: ${({ isLight }) => (isLight ? "var(--color-eerie-black)" : "white")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  font-size: 0.9375rem;
  font-weight: 600;
  margin-right: ${({ hasGroup }) => (hasGroup ? "1rem" : 0)};
  min-height: 1.25rem;
  min-width: 1.25rem;
  opacity: ${({ disabled }) => (disabled ? 0.25 : 1)};
  padding: ${({ isSmall }) =>
    isSmall ? "0.1rem 0.5rem 0.15rem" : "0.2rem 1rem 0.3rem"};
  white-space: nowrap;

  :hover {
    opacity: ${({ disabled }) => (disabled ? 0.25 : 1)};
  }
`;

const COLOR = {
  danger: { isLight: false, value: "var(--color-shadow)" },
  info: { isLight: false, value: "var(--color-misty-moss)" },
  primary: { isLight: false, value: "var(--color-lapis-lazuli)" },
  secondary: { isLight: true, value: "var(--color-periwinkle)" },
  warning: { isLight: false, value: "var(--color-lapis-lazuli)" }
};

export default ({
  children,
  color = "primary",
  disabled = false,
  hasGroup = false,
  icon,
  isSmall = false,
  ...props
}) => {
  if (icon === undefined)
    return (
      <Button
        color={COLOR[color].value}
        disabled={disabled}
        hasGroup={hasGroup}
        hasText
        isLight={COLOR[color].isLight}
        isSmall={isSmall}
        {...props}
      >
        {children}
      </Button>
    );

  const hasText = children !== undefined;

  return (
    <Button
      disabled={disabled}
      hasGroup={hasGroup}
      hasText={hasText}
      isLight={COLOR[color].isLight}
      isSmall={isSmall}
      {...props}
    >
      <Icon icon={icon} color={COLOR[color].value} />
      {children}
    </Button>
  );
};
