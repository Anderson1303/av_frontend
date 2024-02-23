import { render, fireEvent, renderHook, screen } from '@testing-library/react'; 
import { FormDatePicker } from '.'; 
import { useForm, } from "react-hook-form";
import '@testing-library/jest-dom'

describe('FormDatePicker', () => {

    const { result } = renderHook(() => useForm());
    const { register, formState, control, handleSubmit} = result.current;
    const { errors } = formState

    it('should toggle switch when clicked', () => { 
        const { getByRole } = render(<FormDatePicker validateError={handleSubmit} register={register} error={errors} role='datepicker' name='datepicker' control={control} />); 

        const input = getByRole("datepicker") as HTMLInputElement;
    });
});