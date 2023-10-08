import { Grid, GridProps } from "@mui/material";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface GridRegisterProp<T extends FieldValues> extends GridProps {
  name?: Path<T>;
  children: JSX.Element | JSX.Element[];
  setValue?: any;
  register?: UseFormRegister<FieldValues>;
  resetField?: any;
  watch?: any;
  trigger?: any;
  getValues?: any;
}

export function GridRegister<T extends FieldValues>({
  name,
  children,
  setValue,
  register,
  resetField,
  watch,
  trigger,
  getValues,
  ...rest
}: GridRegisterProp<T>) {
  return (
    <Grid {...rest}>
      {React.Children.map(children, function (child: any) {
        return React.cloneElement(child, {
          register,
          setValue,
          resetField,
          getValues,
          trigger,
          watch
        });
      })}
    </Grid>
  );
}
