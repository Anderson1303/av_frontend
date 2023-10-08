import { FormControl, FormLabel, Switch, SwitchProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path, PathValue, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import {styles} from './../../../styles/error';

interface FormSwitchProps<T extends FieldValues> extends SwitchProps {
  name: Path<T>;
  label?: ReactNode;
  control: Control<T, any>;
  defaultChecked?: PathValue<T, Path<T>>;
  getValueChecked?: (value: boolean) => void;
  register?: UseFormRegister<FieldValues>;
  error?: any;
  validateError?: UseFormHandleSubmit<FieldValues>;
}
export function FormSwitch<T extends FieldValues,>({
  name, label, control, defaultChecked, getValueChecked, register, error, validateError, ...rest
}: FormSwitchProps<T>) {

  const messageError = error != null && error[name] != undefined ? error[name].message : "";

  return (
    <FormControl {...register!!(name)} component="fieldset" variant="standard">
      <FormLabel component="legend" sx={{ fontSize: 12 }}>
        <Typography style={messageError.length > 0 ? styles.error : styles.normal}>
          {messageError.length > 0 ? `(${messageError})` : label }
        </Typography>
      </FormLabel>
      <Controller
        name={name}
        defaultValue={defaultChecked}
        control={control}
        render={({
          field: { onChange, value, ref },
        }) => (
          <Switch
            {...register!!(name)}
            checked={value ?? false}
            size="medium"
            onChange={(event, checked) => {
              validateError!!(() => {});
              onChange(event);
              !!getValueChecked && getValueChecked(checked)
            }}
            ref={ref}
            {...rest}
          />
        )}
      />
    </FormControl>
  )
}
