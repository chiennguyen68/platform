'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Select } from '@/components/kit/select';
import { useFormProvider } from '@/hooks/useFormProvider.hook';

interface IProps extends SelectPrimitive.SelectProps {
    name: string;
}

const FormSelect = ({ name, onValueChange, ...rest }: IProps): JSX.Element => {
    const form = useFormProvider();

    const handleOnValueChange = (value: string): void => {
        form.updateFieldValue(name, value);
        onValueChange?.(value);
    };

    return (
        <Select
            {...rest}
            value={String(form.value(name) || '')}
            onValueChange={handleOnValueChange}
        />
    );
};

export default FormSelect;
