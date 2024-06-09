import React from 'react';
import styles from './styles.module.scss';
import { cn } from '@/helpers/utils.helper';
import { LoadableArea } from '../loadable-area';
import { ScrollArea } from '../scroll-area';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface IProps {
    children?: React.ReactNode;
}

export type SortDirectionType = 'asc' | 'des';

interface ITableProps extends IProps {
    maxHeight?: number | string;
    isLoading?: boolean;
}

interface ITableRowProps extends IProps {
    onClick?: VoidFunction;
}

interface ITableCellProps extends IProps {
    align?: 'left' | 'right' | 'center';
    isBold?: boolean;
}

interface ITableHeadingProps extends ITableCellProps {
    isSortable?: boolean;
    sortDirection?: SortDirectionType;
    onSortChange?: (dir: SortDirectionType) => void;
}

const Table = ({ children, maxHeight, isLoading }: ITableProps): JSX.Element => {
    return (
        <LoadableArea className="w-full" isLoading={isLoading}>
            <ScrollArea className={styles.container} maxHeight={maxHeight}>
                <table>{children}</table>
            </ScrollArea>
        </LoadableArea>
    );
};

const TableRow = ({ children, onClick }: ITableRowProps): JSX.Element => {
    return (
        <tr className={cn(onClick && styles.clickable)} onClick={onClick}>
            {children}
        </tr>
    );
};

const TableHeading = ({
    children,
    align,
    isSortable,
    sortDirection,
    onSortChange,
}: ITableHeadingProps): JSX.Element => {
    const handleOnSortChange = (): void => {
        if (!isSortable) return;
        onSortChange?.(sortDirection === 'asc' ? 'des' : 'asc');
    };

    return (
        <th className={cn(styles.th, align && styles[align], isSortable && styles.sortable)}>
            <button className={styles.headingWrapper} onClick={handleOnSortChange}>
                {children}
                {isSortable && (
                    <span className={styles.sortButton}>
                        <ChevronUp
                            size={14}
                            className={cn(sortDirection === 'asc' && styles.active)}
                        />
                        <ChevronDown
                            size={14}
                            className={cn(sortDirection === 'des' && styles.active)}
                        />
                    </span>
                )}
            </button>
        </th>
    );
};

const TableCell = ({ children, align, isBold }: ITableCellProps): JSX.Element => {
    return (
        <td className={cn(styles.td, align && styles[align], isBold && styles.bold)}>{children}</td>
    );
};

export { Table, TableRow, TableHeading, TableCell };
