import { BaseTextFieldProps, FormControl, TextField, Box, FormLabel, Typography, FormControlLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { Control, Controller, FieldValues, Path, PathValue, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import moment from "moment";
import { useEffect, useState } from "react";

interface FormDatePickerProps<T extends FieldValues> extends BaseTextFieldProps {
  name: Path<T>;
  control: Control<T, any>;
  defaultValue?: PathValue<T, Path<T>>;
  register?: UseFormRegister<FieldValues>;
  error?: any;
  setValue?: any;
  getValues?: any;
  resetField?: any;
  validateError?: UseFormHandleSubmit<FieldValues>;
}
export function FormDatePicker<T extends FieldValues,>({
  name, control, defaultValue, register, error, validateError, setValue, getValues, resetField,
  ...rest
}: FormDatePickerProps<T>) {
  const messageError = error != null && error[name] != undefined ? error[name].message : "";
  const [defaultDate, setDefaultDate] = useState<any>((defaultValue as string) ?? '');

  const toFormat = (dateI: string) => {
     return moment(dateI,'DD/MM/YYYY').format('YYYY-MM-DD');
  }

  useEffect(() => {
    resetField(name,'',true);
    if(defaultValue == undefined)
      return;
    if(moment(defaultValue,'DD/MM/YYYY').isValid()){
      setValue(name, toFormat(defaultValue));
      setDefaultDate(toFormat(defaultValue));
    }
  },[])

  return (
      <FormControl component="fieldset" variant="standard" {...register!!(name)}>
        <Controller
          name={name}
          defaultValue={defaultDate as any}
          control={control}
          render={({
            field: { onChange, value, ref },
            fieldState: { error }
          }) => (
            <LocalizationProvider {...register!!(name)} dateAdapter={AdapterDateFns} locale={ptBrLocale}>
              <DatePicker {...register!!(name)}
                value={value ?? null}
                onChange={(a: any,b: any) => {
                  resetField(name,'',true);
                  onChange(a,b);
                  setValue(name,toFormat(a));
                }}
                disabled={rest.disabled}
                renderInput={(params) => (
                  <TextField
                    helperText={!!error ? error.message : rest.label}
                    {...params}
                    id={name}
                    size="small"
                    {...register!!(name)}
                    fullWidth
                    error={messageError.length > 0}
                    value={value}
                    variant={params.variant}
                    style={{width: 150}}
                    ref={ref}
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
  )
}
