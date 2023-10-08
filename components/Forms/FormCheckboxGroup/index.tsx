import {
  CheckboxProps,
  FormControl,
  FormControlLabelProps,
  FormLabel,
  Typography,
  TypographyProps
} from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues
} from 'react-hook-form';
import { useSet } from '../../../structureState/useStateSet';
import { styles } from '../../../styles/error';

export interface FormCheckboxProps<T extends FieldValues>
  extends Omit<FormControlLabelProps, 'control'> {
  name: Path<T>;
  label: React.ReactNode;
  control: Control<T, any>;
  defaultChecked?: PathValue<T, Path<T>>;
  checkboxProps?: CheckboxProps;
  getValueChecked?: (value: boolean) => void;
  typographyProps?: TypographyProps;
  children: JSX.Element | JSX.Element[];
  register?: any;
  error?: any;
  setValue?: any;
  getValues?: UseFormGetValues<FieldValues>;
}

export function FormCheckboxGroup<T extends FieldValues>({
  name,
  control,
  label,
  defaultChecked,
  checkboxProps,
  getValueChecked,
  typographyProps,
  children,
  setValue,
  register,
  error,
  ...rest
}: FormCheckboxProps<T>) {

  const checksList = useSet<string>(defaultChecked ?? []);

  const onChangeParent = (status: Boolean, nameId: string) => {
    if(status){
      checksList.add(nameId);
    }else{
      checksList.remove(nameId);
    }
    setValue(name,checksList.toArray());
  };

  useEffect(() => {
    setValue(name,checksList.toArray());
  },[error])
  
  const messageError = error != null && error[name] != undefined ? error[name].message : "";

  return (
    <FormControl {...register(name!!)} component="fieldset">
      <FormLabel style={{paddingTop: 10}} error={messageError.length > 0} component="legend">{label}</FormLabel>
      <Controller
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <>
            <div>
              {...React.Children.map(children, function (child: any) {
                const {props} = child;
                const defaultValue = checksList.has(props.name);
                return React.cloneElement(child, {
                  onChangeParent: onChangeParent,
                  defaultValue: defaultValue
                });
              })}
            </div>
          </>
        )}
        control={control}
      />
    </FormControl>
  );
}
