import { forwardRef } from 'react';
import { InputMask, type InputMaskProps } from '@react-input/mask';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function App({mask,register,name,label}) {

  const ForwardedInputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, forwardedRef) => {
    return <InputMask ref={forwardedRef} mask={mask} replacement="_" {...props} />;
  });

  return (
    <TextField
      {...register(name, { required: true })}
      label={label}
      InputProps={{
        inputComponent: ForwardedInputMask,
      }}
      required={true}
    />
  );
}