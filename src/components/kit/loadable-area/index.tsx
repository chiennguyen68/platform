import styles from './styles.module.scss';
import { cn } from '@/helpers/utils.helper';
import { Loader } from 'lucide-react';

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
}

const LoadableArea = ({
    isLoading,
    className,
    children,
    ...rest
}: IProps): JSX.Element => {
    return (
        <div className={cn(className, styles.container)} {...rest}>
            {isLoading && (
                <div className={styles.overlay}>
                    <div className={styles.iconWrapper}>
                        <Loader size={20} />
                    </div>
                </div>
            )}
            {children}
        </div>
    );
};

export { LoadableArea };
