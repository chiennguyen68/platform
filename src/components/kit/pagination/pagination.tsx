import React from 'react';
import styles from './styles.module.scss';
import { Button } from '../button';
import { cn } from '@/helpers/utils.helper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface IProps {
    className?: string;
    total: number;
    itemsPerPage: number;
    currentPage?: number;
    distanceFromCurrentPage?: number;
    maxDisplayedNavs?: number;
    onChange?: (page: number) => void;
}

const Pagination = ({
    className,
    total,
    itemsPerPage = 20,
    currentPage = 0,
    maxDisplayedNavs = 6,
    onChange,
}: IProps): JSX.Element | null => {
    const maxPage = React.useMemo(
        () => Math.ceil(total / itemsPerPage) - 1,
        [itemsPerPage, total]
    );

    const paginationItems = ((): (number | string)[] => {
        let arr: (number | string)[] = [];
        const minPage = 0;
        if (maxPage === 0) return [minPage];

        let numberOfTheRestNavsWithoutMinMaxAndCurrentPage =
            maxDisplayedNavs - 2;
        if (currentPage !== 0 && currentPage !== maxPage)
            numberOfTheRestNavsWithoutMinMaxAndCurrentPage -= 1;
        if (numberOfTheRestNavsWithoutMinMaxAndCurrentPage < 0)
            return [minPage];

        const halfOfTheRest =
            numberOfTheRestNavsWithoutMinMaxAndCurrentPage / 2;
        let leftNavs = Math.ceil(halfOfTheRest);
        let rightNavs = Math.floor(halfOfTheRest);

        if (currentPage - minPage <= leftNavs) {
            leftNavs = Math.max(currentPage - minPage - 1, 0);
            rightNavs =
                numberOfTheRestNavsWithoutMinMaxAndCurrentPage - leftNavs;
        } else if (maxPage - currentPage <= rightNavs) {
            rightNavs = Math.max(maxPage - currentPage - 1, 0);
            leftNavs =
                numberOfTheRestNavsWithoutMinMaxAndCurrentPage - rightNavs;
        }

        for (let i = 1; i <= leftNavs; i++) {
            const pg = currentPage - i;
            if (pg > minPage) arr = [pg, ...arr];
        }

        if (Number(arr[0]) > minPage + 1) arr = ['...left', ...arr];
        arr.push(currentPage);
        if (arr[0] !== minPage) arr = [minPage, ...arr];

        for (let i = 1; i <= rightNavs; i++) {
            const pg = currentPage + i;
            if (pg < maxPage) arr.push(pg);
        }
        if (Number(arr[arr.length - 1]) < maxPage - 1) arr.push('...right');
        if (arr[arr.length - 1] !== maxPage) arr.push(maxPage);

        return arr;
    })();

    const triggerOnChange = (page: number): void => {
        if (!onChange) return;
        onChange(page);
    };

    const handleForward = (): void => {
        const newCurrentPage = currentPage + 1;
        triggerOnChange(newCurrentPage);
    };

    const handleBackward = (): void => {
        const newCurrentPage = currentPage - 1;
        triggerOnChange(newCurrentPage);
    };

    if (!total) return null;

    return (
        <div
            className={cn(className, styles.container)}
            data-testid="pagination"
        >
            <Button
                variant="outline"
                disabled={currentPage <= 0}
                onClick={handleBackward}
            >
                <ChevronLeft size={16} />
            </Button>
            {paginationItems.map((o) =>
                typeof o === 'number' ? (
                    <Button
                        key={o}
                        className={cn(
                            o + 1 >= 1000 && styles.tinyText,
                            o + 1 >= 100 && styles.smallText
                        )}
                        variant={o === currentPage ? 'primary' : 'outline'}
                        onClick={(): void => {
                            triggerOnChange(o);
                        }}
                    >
                        {o + 1}
                    </Button>
                ) : (
                    <span key={o}>...</span>
                )
            )}

            <Button
                variant="outline"
                disabled={currentPage >= Math.ceil(total / itemsPerPage) - 1}
                onClick={handleForward}
            >
                <ChevronRight size={16} />
            </Button>
        </div>
    );
};

export { Pagination };
