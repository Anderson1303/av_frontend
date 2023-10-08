import { Button, ButtonProps } from "@/components/Button";
import styled from "@emotion/styled";
import { theme } from "./theme";

export const ButtonCanceledStyled = styled(Button)<ButtonProps>(() => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.default,
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: 10,
  "&:hover": {
    background: theme.palette.background.default,
  },
  textTransform: "none",
  fontWeight: 700,
  width: 133,
}));

export const ButtonAvancedStyled = styled(Button)<ButtonProps>(() => ({
  color: theme.palette.background.default,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 10,
  textTransform: "none",
  fontWeight: 700,
  width: 133,
}));
