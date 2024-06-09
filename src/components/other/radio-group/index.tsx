/* eslint-disable indent */
import { cn } from '@/helpers/utils.helper';
import styles from './styles.module.scss';

interface IRadioOptionProps {
    className?: string;
    value: string | number;
    label: string;
    onSelect?: VoidFunction;
}

export interface IRadioGroupProps {
    className?: string;
    options: IRadioOptionProps[];
    value?: string | number;
    onChange?: (value: string | number) => void;
}

const RadioOption = ({ label, className, onSelect }: IRadioOptionProps): JSX.Element => {
    return (
        <button className={cn(className, styles.option)} onClick={onSelect}>
            {label}
        </button>
    );
};
RadioOption.displayName = 'RadioOption';

const RadioGroup = ({ className, options, value, onChange }: IRadioGroupProps): JSX.Element => {
    const handleOnSelectOption =
        (option: IRadioOptionProps): VoidFunction =>
        (): void => {
            onChange?.(option.value);
        };

    const activeOption = options.find((item) => item.value === value);

    return (
        <div className={cn(className, styles.container)}>
            {options.map((item) => (
                <RadioOption
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    onSelect={handleOnSelectOption(item)}
                    className={cn(activeOption && activeOption?.value === item.value && styles.active)}
                />
            ))}
        </div>
    );
};

export default RadioGroup;
