import { render, fireEvent, renderHook, screen } from '@testing-library/react'; 
import { FormSwitch } from '.'; 
import { useForm, } from "react-hook-form";
import '@testing-library/jest-dom'

describe('FormSwitch', () => { 

    const { result } = renderHook(() => useForm());
    const { register, formState, control, handleSubmit} = result.current;
    const { errors } = formState

    it('should toggle switch when clicked', () => { 
        const { getByRole } = render(<FormSwitch validateError={handleSubmit} register={register} error={errors} defaultChecked={true} role='switch' name='switch1' label='Status' control={control} />); 
        const switchButton = getByRole('switch'); 
        
        expect(switchButton).toHaveClass('Mui-checked');
        fireEvent.click(switchButton); 
        expect(switchButton).toBeTruthy();
    });
});