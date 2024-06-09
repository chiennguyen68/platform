import React from 'react';
import styles from './styles.module.scss';
import { cn, isEmpty } from '@/helpers/utils.helper';

interface IProps {
    className?: string;
    children?: React.ReactNode;
    label: string;
    hasRequiredMarker?: boolean;
    helperText?: React.ReactNode;
}

const FormItem = ({
    className,
    children,
    label,
    hasRequiredMarker,
    helperText,
}: IProps): JSX.Element => {
    return (
        <div className={cn(className, styles.container)}>
            <div className={cn(styles.label)}>
                <span>
                    {label}
                    {hasRequiredMarker && (
                        <span className={styles.requiredMarker}>*</span>
                    )}
                </span>
                {
                    !isEmpty(helperText)
                    &&
                    <span className={styles.helperText}>{helperText}</span>
                }
            </div>
            <div className={styles.mainContent}>{children}</div>
        </div>
    );
};

export default FormItem;
