import { render, fireEvent, renderHook, screen } from '@testing-library/react'; 
import { FormTextField } from '.'; 
import { useForm, } from "react-hook-form";
import '@testing-library/jest-dom'

describe('FormTextField', () => { 

    const { result } = renderHook(() => useForm());
    const { register, formState, control, handleSubmit} = result.current;
    const { errors } = formState

    it('should render correctly textfield input value', () => { 
        const handleChange = jest.fn(); 
        const { getByRole } = render( <FormTextField validateError={handleSubmit} register={register} error={errors} role='textfield' name="textfield" control={control}><span>teste 1</span></FormTextField>); 
        
        const input = getByRole('textbox')
        fireEvent.change(input, { target: { value: 'John' } }); 
        expect(input).toHaveDisplayValue('John')
        expect(handleChange).toHaveBeenCalled();
    });
});