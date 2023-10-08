import { BaseTextFieldProps, FormControl, OutlinedInputProps, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path, PathValue, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { formatMask } from "../../../utils/formatMask";
import {styles} from './../../../styles/error';

export interface FormTextFieldProps<T extends FieldValues> extends BaseTextFieldProps {
  name: Path<T>;
  control: Control<T, any>;
  defaultValue?: PathValue<T, Path<T>>;
  mask?: string | string[];
  InputProps?: Partial<OutlinedInputProps>;
  register?: UseFormRegister<FieldValues>;
  error?: any;
  validateError?: UseFormHandleSubmit<FieldValues>;
}

export function FormTextField<T extends FieldValues,>({
  name, control, defaultValue, mask, InputProps, register, error, validateError, ...rest
}: FormTextFieldProps<T>) {

  const messageError = error != null && error[name] != undefined ? error[name].message : "";

  return (
    <FormControl component="fieldset" variant="standard" {...register!!(name)}>
      <Controller
        {...register!!(name)}
        name={name}
        defaultValue={defaultValue ?? "" as any}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { error }
        }) => (<>
                <TextField
                  {...register!!(name)}
                  id={name}
                  helperText={!!error ? error.message : null}
                  error={messageError.length > 0}
                  size="small"
                  fullWidth
                  onChange={event => { !
                    !mask ? onChange(formatMask(event.target.value, mask)) : onChange(event);
                    validateError!!(() => {});
                  }}
                  InputProps={InputProps}
                  sx={{
                    "&.MuiTextField-root": { paddingRight: '10px' }
                  }}
                  {...rest}
                  inputProps={
                    rest.disabled
                      ? {
                        ...rest.inputProps,
                        style: { backgroundColor: '#F7F7F7', borderRadius: 3, color: '#000'}
                      }
                      : {...rest.inputProps}
                  }
                  variant={rest.variant}
                  ref={ref}  
                />
                  {messageError.length > 0 && <span style={styles.error} className='invalid-field'>{messageError}</span>}
            </>
        )}
      />
    </FormControl>
  )
}
