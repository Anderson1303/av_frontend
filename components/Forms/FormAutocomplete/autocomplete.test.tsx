import { render, fireEvent, renderHook, screen } from '@testing-library/react'; 
import { FormAutocomplete } from '.'; 
import { useForm, } from "react-hook-form";
import '@testing-library/jest-dom'

describe('FormCheckbox', () => { 
    const { result } = renderHook(() => useForm());
    const { register, formState, control, handleSubmit} = result.current;
    const { errors } = formState

    const listOptions = [{value: 1, label: 'name 1'},
    {value: 2, label: 'name 2'},
    {value: 3, label: 'name 3'},
    {value: 4, label: 'name 4'}];

    it('should render correctly list', () => { 
        render( <FormAutocomplete validateError={handleSubmit} register={register} error={errors} label={'lol'} options={listOptions} loading={false} name="autocomplete1" control={control} /> ); 
        
        const autoComplete = screen.getByRole("combobox");
        expect(autoComplete).toBeVisible();

        const autoCompleteDropdown = screen.getByRole("button", { name: "Open" });

        expect(autoCompleteDropdown).toBeVisible();
        fireEvent.click(autoCompleteDropdown);

        expect(screen.getByRole("presentation")).toBeVisible();

        expect(screen.getAllByRole("option").length).toEqual(listOptions.length)
    });
});