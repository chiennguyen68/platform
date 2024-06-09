import { cn } from '@/helpers/utils.helper';
import { ScrollArea } from '@/components/kit/scroll-area';

interface IProps {
    className?: string;
    children?: React.ReactNode;
}

const FHeightArea = ({ children, className }: IProps): JSX.Element => {
    return (
        <ScrollArea height="calc(100vh - 310px)" className={cn('pr-16', className)}>
            {children}
        </ScrollArea>
    );
};

export default FHeightArea;
