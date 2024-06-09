'use client';

import FormValidationError from '../validation-error';
import { Textarea, TextareaProps } from '@/components/kit/textarea';
import { isEmpty } from '@/helpers/utils.helper';
import { useFormProvider } from '@/hooks/useFormProvider.hook';

interface IProps extends TextareaProps {
    name: string;
}

const FormTextarea = ({
    name,
    onChange,
    onBlur,
    ...rest
}: IProps): JSX.Element => {
    const form = useFormProvider();
    const error = form.error(name);

    const handleOnChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        const value = e.target.value;
        form.updateFieldValue(name, value);
        form.clearFieldError(name);
        onChange?.(e);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
        form.validate(name);
        onBlur?.(e);
    };

    return (
        <>
            <Textarea
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

export default FormTextarea;
