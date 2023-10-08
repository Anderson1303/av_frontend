import React, { ReactNode, useState } from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  TypographyProps,
} from '@mui/material';
import {
  Control,
  Controller,
  FieldValues,
  Path,
} from 'react-hook-form';

export interface FormCheckboxProps<T extends FieldValues>
  extends Omit<FormControlLabelProps, 'control'> {
  name: Path<T>;
  label: ReactNode;
  control: Control<T, any>;
  defaultChecked?: boolean;
  checkboxProps?: CheckboxProps;
  getValueChecked?: (value: boolean) => void;
  typographyProps?: TypographyProps;
  onChangeParent?: any;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  defaultChecked,
  checkboxProps,
  getValueChecked,
  typographyProps,
  onChangeParent,
  ...rest
}: FormCheckboxProps<T>) {
  const [checked, setChecked] = useState<any>(rest.defaultValue ?? false);

  return (
    <FormControlLabel
      label={label}
      componentsProps={{ typography: typographyProps }}
      control={
        <Controller
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Checkbox
              size="small"
              value={value}
              onClick={() => {
                setChecked(!checked);
                onChangeParent(!checked, name);
              }}

              checked={checked}
              disabled={rest.disabled}
              ref={ref}
              {...checkboxProps}
            />
          )}
          control={control}
        />
      }
      {...rest}
    />
  );
}
