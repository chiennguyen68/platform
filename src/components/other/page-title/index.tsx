import React from 'react';
import styles from './styles.module.scss';
import { cn } from '@/helpers/utils.helper';

interface IProps {
    className?: string;
    title: string;
    description?: string;
    extra?: React.ReactNode;
}

const PageTitle = ({
    className,
    title,
    description,
    extra,
}: IProps): JSX.Element => {
    return (
        <div className={cn(styles.container, className)}>
            <div className={styles.mainContent}>
                <h2>{title}</h2>
                {!!description && <p>{description}</p>}
            </div>

            {extra}
        </div>
    );
};

export default PageTitle;
