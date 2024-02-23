import { render, fireEvent, renderHook, screen } from '@testing-library/react'; 
import { FormRadioGroup } from '.'; 
import { FormRadioItem } from './FormRadioItem';
import { useForm, } from "react-hook-form";
import '@testing-library/jest-dom'

describe('FormRadioGroup', () => { 

    const { result } = renderHook(() => useForm());
    const { register, formState, control, handleSubmit} = result.current;
    const { errors } = formState
        
    test('should call onChange handler', () => { 
        const handleChange = jest.fn(); 
        const { result } = renderHook(() => useForm())
        const { getByLabelText } = render(<FormRadioGroup validateError={handleSubmit} register={register} error={errors} label='teste radio group' name='radiogroup' control={control}>
            <FormRadioItem onClick={(event) => handleChange(event)} label='Option 1' value={'teste 1'} />
            <FormRadioItem onClick={(event) => handleChange(event)} label='Option 2' value={'teste 2'} />
        </FormRadioGroup>);
        fireEvent.click(getByLabelText('Option 2')); 
        expect(handleChange).toHaveBeenCalledTimes(1); 
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); 
        expect(handleChange.mock.calls[0][0].target.value).toBe('teste 2');
    }); 
});