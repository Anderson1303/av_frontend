import { TypeOption } from '../../interfaces/IOption';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, IconButton, InputAdornment, InputLabel, OutlinedInput, OutlinedInputProps, Typography, UseAutocompleteReturnValue } from "@mui/material";

interface InputProps<TOption extends TypeOption> {
  autocomplete: UseAutocompleteReturnValue<TOption, boolean, boolean, boolean>;
  isLoading: boolean;
  onClick: () => void;
  inputProps?: Omit<OutlinedInputProps, "fullWidth">;
  width: number | string;
  helperText?: string;
  textMultiple: string;
}
export function Input<TOption extends TypeOption>({
  autocomplete, isLoading, onClick, inputProps, width, helperText,textMultiple,
}: InputProps<TOption>) {
  const { value, id, getInputLabelProps, getInputProps, setAnchorEl } = autocomplete

  return (
    <>
      <InputLabel
        {...getInputLabelProps()}
        htmlFor={id}
        sx={{
          "&.MuiInputLabel-root": { marginTop: -1 },
          "&.MuiInputLabel-root.MuiInputLabel-shrink": { marginTop: 0 }
        }}
      >
        {inputProps?.required ? inputProps?.label + " *" : inputProps?.label}
      </InputLabel>
      <OutlinedInput
        inputProps={{ ...getInputProps() }}
        id={id}
        value={value}
        size='small'
        ref={setAnchorEl}
        sx={{ width: width }}
        endAdornment={
          isLoading ?
            <InputAdornment position="end">
              <CircularProgress color="inherit" size={20} />
            </InputAdornment>
            : <span style={{fontSize: 11, width: width}}>{textMultiple}</span>
        }
        {...inputProps}
      />
      {
        !!helperText && inputProps?.error &&
        <Typography
          component="p"
          margin=".25rem .875rem 0"
          variant='caption'
          color={theme => theme.palette.error.main}
        >
          {helperText}
        </Typography>
      }
    </>
  )
}