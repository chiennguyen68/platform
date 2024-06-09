import { cn } from '@/helpers/utils.helper';
import styles from './styles.module.scss';

interface IProps {
    className?: string;
    children?: React.ReactNode;
}

const Wrapper = ({ className, children }: IProps): JSX.Element => {
    return <div className={cn(styles.container, className)}>{children}</div>;
};

export default Wrapper;
