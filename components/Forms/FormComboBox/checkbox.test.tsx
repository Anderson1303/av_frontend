import { render, fireEvent, renderHook, screen } from '@testing-library/react'; 
import { FormCheckbox } from '.'; 
import { useForm, } from "react-hook-form";
import '@testing-library/jest-dom'

describe('FormCheckbox', () => { 

    const { result } = renderHook(() => useForm());
    const { register, formState, control, handleSubmit} = result.current;
    const { errors } = formState

    it('should render the label', () => { 
        const { result } = renderHook(() => useForm())
        const { getByText } = render( <FormCheckbox validateError={handleSubmit} register={register} error={errors} name="myCheckbox" label="My Checkbox" control={control} /> ); 
        expect(getByText('My Checkbox')).toBeInTheDocument(); 
    }); 
    
    it('should check the checkbox when defaultChecked is true', () => { 
        const { result } = renderHook(() => useForm())
        const { getByRole } = render( <FormCheckbox validateError={handleSubmit} register={register} error={errors} name="myCheckbox" label="My Checkbox" control={control} defaultChecked={true} /> ); 
        expect(getByRole('checkbox')).toBeChecked(); 
    }); 
    
    it('should call the getValueChecked function when checkbox is clicked', () => { 
        const { result } = renderHook(() => useForm())
        const mockGetValueChecked = jest.fn(); 
        const { getByRole } = render( <FormCheckbox validateError={handleSubmit} register={register} error={errors} name="myCheckbox" label="My Checkbox" control={control} getValueChecked={mockGetValueChecked(true)} /> ); 
        fireEvent.click(getByRole('checkbox')); 
        expect(mockGetValueChecked).toHaveBeenCalledTimes(1); 
        expect(mockGetValueChecked).toHaveBeenCalledWith(true); 
    });
});