import { cn, isEmpty } from '@/helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string;
    children?: React.ReactNode;
    color?: string;
    bgColor?: string;
    variant?: 'outline' | 'default';
    isBlur?: boolean;
    onClick?: VoidFunction;
}

const Tag = ({ className, children, color, bgColor, variant, isBlur, onClick }: IProps): JSX.Element => {
    const style = color || bgColor ? { color, backgroundColor: bgColor || '' } : {};

    return (
        <button
            className={cn(
                className,
                styles.container,
                variant && styles[variant],
                isBlur && styles.blur,
                !isEmpty(onClick) && styles.clickable
            )}
            style={style}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export { Tag };
