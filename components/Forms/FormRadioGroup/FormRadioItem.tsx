
import { FormControlLabel, FormControlLabelProps, Radio } from "@mui/material";
import { FormEventHandler, ForwardRefRenderFunction, ReactElement, ReactNode, forwardRef, useEffect } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface RadioItemProps {
  value: string;
  label: ReactNode;
  onChangeCapture?: FormEventHandler<HTMLLabelElement>;
  onClick: FormEventHandler<HTMLLabelElement>;
  disabled?: boolean;
  radio?: ReactElement<any, any>;
  register?: UseFormRegister<FieldValues>;
  name?: string;
}

const RadioItemBase: ForwardRefRenderFunction<FormControlLabelProps, RadioItemProps> = ({
  label, value,onClick, onChangeCapture, disabled = false, radio, register, name, ...rest
}, ref) => {

  return (
    <FormControlLabel
      value={value}
      label={label}
      {...register!!(name!!)}
      disabled={disabled}
      onChangeCapture={onChangeCapture}
      control={<Radio  {...register!!(name!!)} size="small" />}
      ref={ref}
      {...rest}
    />
  )
}
export const FormRadioItem = forwardRef(RadioItemBase);
