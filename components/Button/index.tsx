import React from 'react';
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Badge, BadgeProps,Box, CircularProgress, Button as ButtonC  } from "@mui/material";
import { ForwardRefRenderFunction, forwardRef } from "react";

export interface ButtonProps extends LoadingButtonProps {
  badgeContent?: number;
  badgeProps?: BadgeProps;
}
const BaseButton: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
  badgeContent, badgeProps, loading, ...rest
}, ref) => {

  return (
    <Badge
      badgeContent={badgeContent}
      color="primary"
      {...badgeProps}
    >
      <ButtonC sx={{
          ...rest.sx,
          ":disabled": {
            background: theme => theme.palette.primary.main, opacity: 0.5,
            paddingLeft: 10
          }
        }}
        {...rest}
        variant="contained"
        ref={ref}>
        {rest.children}  
      </ButtonC>
    </Badge>
  )
}
export const Button = forwardRef(BaseButton);
