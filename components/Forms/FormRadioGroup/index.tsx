
import { FormControl, FormLabel, RadioGroup, RadioGroupProps } from '@mui/material';
import { ForwardRefRenderFunction, forwardRef, useEffect } from 'react';
import { Control, Controller, FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import {styles} from './../../../styles/error';
import React from 'react';

interface FormInputRadio extends RadioGroupProps {
  label?: string;
  name: string;
  control: Control<any, object>;
  defaultValue?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  error?: any;
  validateError?: UseFormHandleSubmit<FieldValues>;
  children: JSX.Element[] | JSX.Element;
  setValue?: UseFormSetValue<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
}

const RadioGroupBase: ForwardRefRenderFunction<RadioGroupProps, FormInputRadio> = ({
  label, name, control, defaultValue, required = false, register, error, validateError, children, setValue,
  ...rest
}, ref) => {

  const messageError = error != null && error[name] != undefined ? error[name].message : "";

  useEffect(() =>{
    setValue!!(name, defaultValue ?? null);
  },[])

  return (
    <FormControl {...register!!(name)} required={required} component="fieldset">
      <FormLabel style={{paddingTop: 10}} error={messageError.length > 0} component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { onChange, value }
        }) => (
          <RadioGroup
            {...register!!(name)}
            id={name}
            aria-label={name}
            name={name}
            value={value}
            onChange={(event: any,dataElem: any) => {
              onChange(event);
              setValue!!(name,dataElem);
            }}
            {...rest}
            ref={ref}
          >
            {React.Children.map(children, function (child: any) {
                return React.cloneElement(child, { register, setValue, name });
            })}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
export const FormRadioGroup = forwardRef(RadioGroupBase);
