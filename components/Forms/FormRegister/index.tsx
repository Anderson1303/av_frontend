import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as validator from 'yup';
import { Button } from './../../Button';
import React, { useEffect, useRef } from 'react';

export interface IForm{
    children: JSX.Element|JSX.Element[];
    label: string;
    loading: boolean;
    onSubmit: (data: any) => void;
    onError: (data: any) => void;
    onEventSubmit: (onSubmit: any) => void;
    schema:  validator.ObjectSchema<any>;
    defaultData: any;
}

const FormRegister = ({children,label,loading,defaultData,onSubmit,onError,onEventSubmit,schema}: IForm) => {

    const optionsForm = { resolver: yupResolver(schema), }
    const { register, handleSubmit, reset, formState, setValue, getValues, resetField, watch, trigger } = useForm({...optionsForm, defaultValues: defaultData,
        mode: "onChange"})
    const { errors } = formState;

    var fieldsBloqued = Array<string>();
    
    React.Children.map(children, function (child: any) {
        const props = child.props;
        if(props.dependOns != undefined){
            fieldsBloqued.push(props.dependOns);
        }
        return child.props;
    })

    return <form style={{height: 700}} onSubmit={handleSubmit(onSubmit,onError)} >
                {React.Children.map(children, function (child: any) {
                    const {inputProps} = child.props;
                    var isBloqued = false && inputProps != null && fieldsBloqued.filter(e => e == inputProps.name).length > 0;
                    return React.cloneElement(child, { register, setValue, getValues, resetField, trigger, watch, isBloqued, error: errors, validateError: handleSubmit });
                })}
            </form>

}

export { FormRegister, validator };