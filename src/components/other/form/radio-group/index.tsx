import RadioGroup, { IRadioGroupProps } from '../../radio-group';
import { useFormProvider } from '@/hooks/useFormProvider.hook';

interface IProps extends IRadioGroupProps {
    name: string;
}

const FormRadioGroup = ({ name, onChange, ...rest }: IProps): JSX.Element => {
    const form = useFormProvider();

    const handleOnChange = (value: string | number): void => {
        form.updateFieldValue(name, value);
        form.clearFieldError(name);
        onChange?.(value);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <RadioGroup value={form.value(name) as any} {...rest} onChange={handleOnChange} />;
};

export default FormRadioGroup;
