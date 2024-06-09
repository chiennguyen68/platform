'use client';

import FormValidationError from '../validation-error';
import { Input, InputProps } from '@/components/kit/input';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { isEmpty } from '@/helpers/utils.helper';

interface IProps extends InputProps {
    name: string;
}

const FormInput = ({
    name,
    onChange,
    onBlur,
    ...rest
}: IProps): JSX.Element => {
    const form = useFormProvider();
    const error = form.error(name);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        form.updateFieldValue(name, value);
        form.clearFieldError(name);
        onChange?.(e);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        form.validate(name);
        onBlur?.(e);
    };

    return (
        <>
            <Input
                {...rest}
                value={String(form.value(name) || '')}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                hasError={!isEmpty(error)}
            />

            {!!error && <FormValidationError message={String(error.message)} />}
        </>
    );
};

export default FormInput;
