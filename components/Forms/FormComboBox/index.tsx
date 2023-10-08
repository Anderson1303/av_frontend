import { Control, Controller, FieldValues, Path, PathValue, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { TypeOption } from "../../../interfaces/IOption";
import { ComboBox, ComboBoxProps } from "../../ComboBox";
import { useSet } from "../../../structureState/useStateSet";
import { FormControl } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export interface FormComboBoxProps<T extends FieldValues, TOption
  extends TypeOption> extends ComboBoxProps<TOption, T> {
  control: Control<T, any>;
  defaultValue?: PathValue<T, Path<T>>;
  getValueOption?: (event: TOption | null) => void;
  register?: UseFormRegister<FieldValues>;
  validateError?: UseFormHandleSubmit<FieldValues>;
  error?: any;
  dependOns?: string;
  parentOn?: string;
  setValue?: any;
  watch?: any;
  trigger?: any;
  getValues?: UseFormGetValues<FieldValues>;
  isBloqued?: boolean;
  resetField?: any;
}

export function FormComboBox<T extends FieldValues, TOption extends TypeOption>({
  control, defaultValue, getValueOption, register, validateError, error, dependOns, parentOn, resetField, isBloqued, setValue, watch, trigger, getValues, ...rest
}: FormComboBoxProps<T, TOption>) {
  const name = rest.inputProps!!.name as Path<T>;
  const messageError = error != null && error[name] != undefined ? error!![name].message : "";
  const dataSet = useSet<T>();
  const [valSelect,setValSelect] = useState("");

  useEffect(() => {
    console.log('init',name,defaultValue)
    setValue(name,defaultValue);
    setValSelect(defaultValue as string)
    !!getValueOption && getValueOption(defaultValue as TOption);
  },[])

  return (
        <FormControl {...register!!(name)}>
          <Controller
            name={name}
            defaultValue={defaultValue ?? "" as any}
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => {

              return (
                <ComboBox
                  id={name}
                  value={valSelect}
                  defaultValue={defaultValue ?? "" as any}
                  disabled={isBloqued}
                  dataSet={dataSet}
                  setValue={setValue}
                  resetField={resetField}
                  watch={watch}
                  error={error}
                  getValues={getValues}
                  validateError={validateError}
                  dependsOn={dependOns}
                  parentOn={parentOn}
                  onChange={async (_: any, value : any) => {
                    setValue!!(name,value);
                    setValue(dependOns,'')
                    setValSelect(value);
                    onChange(value);
                    !!getValueOption && getValueOption(value as TOption);
                  }}
                  helperText={error?.message}
                  inputProps={{ error: messageError.length > 0, name }}
                  register={register}
                  {...rest}
                />
              )
            }}
          />
        </FormControl>
  )
}
