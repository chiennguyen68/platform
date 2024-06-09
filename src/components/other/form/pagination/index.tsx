'use client';

import {
    IProps as IPaginationProps,
    Pagination,
} from '@/components/kit/pagination/pagination';
import { useFormProvider } from '@/hooks/useFormProvider.hook';

interface IProps extends IPaginationProps {
    name: string;
}

const FormPagination = ({ name, onChange, ...rest }: IProps): JSX.Element => {
    const form = useFormProvider();

    const handleOnChange = (page: number): void => {
        form.updateFieldValue(name, page);
        onChange?.(page);
    };

    return (
        <Pagination
            {...rest}
            currentPage={Number(form.value(name) || 0)}
            onChange={handleOnChange}
        />
    );
};

export default FormPagination;
