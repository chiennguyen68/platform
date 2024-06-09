import styles from './styles.module.scss';
import { cn } from '@/helpers/utils.helper';

interface IProps {
    className?: string;
    children?: React.ReactNode;
    maxHeight?: number | string;
    height?: number | string;
}

const ScrollArea = ({
    className,
    children,
    maxHeight,
    height,
}: IProps): JSX.Element => {
    return (
        <div
            className={cn(className, styles.container)}
            style={{
                height,
                maxHeight,
            }}
        >
            {children}
        </div>
    );
};

export { ScrollArea };
