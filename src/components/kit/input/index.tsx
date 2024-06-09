import React from 'react';
import styles from './styles.module.scss';
import { cn } from '@/helpers/utils.helper';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, hasError, ...props }, ref) => {
        return (
            <input
                type={type}
                spellCheck={false}
                className={cn(
                    className,
                    styles.container,
                    hasError && styles.hasError
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
