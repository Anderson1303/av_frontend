import { Autocomplete, AutocompleteProps, BaseTextFieldProps, CircularProgress, FormControl, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path, PathValue, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { IOption } from "../../../interfaces/IOption";
import {styles} from './../../../styles/error';

export interface FormAutocompleteProps<T extends FieldValues>
  extends Omit<AutocompleteProps<IOption, boolean, boolean, boolean, any>, 'renderInput'> {
  name: Path<T>;
  control: Control<T, any>;
  defaultValue?: PathValue<T, Path<T>>;
  textFieldProps?: BaseTextFieldProps;
  loading?: boolean;
  onChangeOption?: (event: IOption | null) => void;
  register?: UseFormRegister<FieldValues>;
  label: string;
  error?: any;
  validateError?: UseFormHandleSubmit<FieldValues>;
}

export function FormAutocomplete<T extends FieldValues,>({
  name, defaultValue, control, textFieldProps, label,
  loading = false, onChangeOption, register, error, validateError, 
  ...rest
}: FormAutocompleteProps<T>) {

  const messageError = error != null && error[name] != undefined ? error[name].message : "";

  return (
    <FormControl {...register!!(name)} component="fieldset" variant="standard">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? null as any}
        render={({
          field: { onChange, value, ref },
          fieldState: { error }
        }) => (
          <Autocomplete
            id={name}
            disabled={rest.disabled}
            value={value}
            noOptionsText="Sem opções"
            isOptionEqualToValue={(option: any, value: IOption | string) =>
              typeof value !== 'string'
                ? option.value === value.value
                : value === ""
            }
            sx={{
              "&.MuiAutocomplete-root": { paddingRight: '10px' }
            }}
            getOptionLabel={
              option => typeof option != 'string' && !!option.value ?
                `${option.label}` : ""}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...register!!(name)}
                {...params}
                size="small"
                error={messageError.length > 0}
                disabled={rest.disabled}
                label={label}
                helperText={error ? error.message : null}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  style: { backgroundColor: '#F7F7F7', borderRadius: 3, color: '#000' },
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment},
                    </>
                  )
                }}
                {...textFieldProps}
              />
            )}
            ref={ref}
            onChange={(_, newValue) => {
              onChange(newValue)
              !!onChangeOption && onChangeOption(typeof newValue == 'object'
                ? newValue as IOption : null);
                validateError!!(()=>{});
            }}
            {...rest}
            options={rest.options ?? []}
          />
        )}
      />
      {messageError.length > 0 && <span style={styles.error} className='invalid-field'>{messageError}</span>}
    </FormControl>
  )
}