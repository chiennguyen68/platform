import styles from './styles.module.scss';
import { cn } from '@/helpers/utils.helper';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'outline' | 'primary';
}

const Button = ({ className, variant, ...rest }: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(
                className,
                styles.container,
                variant && styles[variant]
            )}
            {...rest}
        />
    );
};

export { Button };
