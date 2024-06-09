/* eslint-disable indent */
import React from 'react';
import ActionMenu from '@/components/other/action-menu';
import FormPagination from '@/components/other/form/pagination';
import StatusTag from './status-tag';
import Deboucer from '@/services/utils.service';
import { postService } from '@/services/post.service';
import { isEmpty, withDefaultValue } from '@/helpers/utils.helper';
import { useAppProvider } from '@/hooks/useAppProvider.hook';
import { useLocale } from '@/hooks/useLocale.hook';
import { Tag } from '@/components/kit/tag';
import { PostsContext } from '../context';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { IPost } from '@/@types/post.type';
import { useRouter } from 'next/navigation';
import { DEFAULT_ITEMS_NUMBER_PER_PAGE, PAGE } from '@/constants/common.constant';
import {
    SortDirectionType,
    Table,
    TableCell,
    TableHeading,
    TableRow,
} from '@/components/kit/table';
import Link from 'next/link';

interface IDataState {
    isLoading?: boolean;
    items: IPost[];
    total: number;
}

const PostsTable = (): JSX.Element => {
    const translate = useLocale();
    const searchDeboucer = React.useRef<Deboucer>(new Deboucer());
    const form = useFormProvider();
    const sortField = form.value('sortField');
    const sortDirection = form.value('sortDirection');
    const isInitialized = React.useRef<boolean>(false);
    const { showConfirmationDialog } = React.useContext(PostsContext);
    const { cache, topics } = useAppProvider();
    const navigate = useRouter();

    const [data, setData] = React.useState<IDataState>({
        total: Number(cache.get('post.list.data.total') || 0),
        items: withDefaultValue({
            ogValue: cache.get('post.list.data.items'),
            assignValue: [],
            condition: (ogValue) => !Array.isArray(ogValue),
        }) as IPost[],
    });

    const caption = ((): string => {
        if (data.isLoading) return translate('common.table.loadingText');
        return translate('common.table.noData');
    })();

    const handleNavigateToViewPost =
        (id: string): VoidFunction =>
        (): void => {
            window.open(PAGE.postPreview.replace(':id', id));
        };

    const handleOnSortChange =
        (field: string) =>
        (dir: SortDirectionType): void => {
            form.updateFieldValue('sortField', field);
            form.updateFieldValue('sortDirection', dir);
        };

    const fetch = async (page?: number): Promise<void> => {
        setData((current) => ({
            ...current,
            isLoading: true,
        }));

        const pg = !isEmpty(page) ? Number(page) : (form.value('page') as number);
        if (!isEmpty(page)) form.updateFieldValue('page', page);

        const res = await postService.getPosts({
            search: form.value('search') as string,
            page: pg,
            topic: withDefaultValue({
                ogValue: form.value('topic'),
                assignValue: '',
                condition: (ogValue) => ogValue === 'all',
            }) as string,
            status: withDefaultValue({
                ogValue: form.value('status'),
                assignValue: '',
                condition: (ogValue) => ogValue === 'all',
            }) as string,
        });
        setData({
            isLoading: false,
            total: res.total,
            items: res.posts,
        });
        cache.set('post.list.data', {
            total: res.total,
            items: res.posts,
        });
        isInitialized.current = true;
    };

    React.useEffect(() => {
        if (!isInitialized.current) return;
        fetch(0);
    }, [form.value('topic'), form.value('status')]);

    React.useEffect(() => {
        if (!isInitialized.current) return;
        searchDeboucer.current.exec((): void => {
            fetch(0);
        });
    }, [form.value('search')]);

    React.useEffect(() => {
        fetch();
        return (): void => {
            searchDeboucer.current.destroy();
        };
    }, []);

    const onEdit = (id: string | undefined): void => {
        navigate.push(`${PAGE.postEdition}/${id}`);
    };

    return (
        <>
            <Table isLoading={data.isLoading && !!data.items.length}>
                {!data.items.length && <caption>{caption}</caption>}

                <thead>
                    <tr>
                        <TableHeading
                            isSortable
                            sortDirection={
                                sortField === 'title'
                                    ? (sortDirection as SortDirectionType)
                                    : undefined
                            }
                            onSortChange={handleOnSortChange('title')}
                        >
                            {translate('common.table.title')}
                        </TableHeading>
                        <TableHeading>{translate('common.table.topic')}</TableHeading>
                        <TableHeading
                            isSortable
                            align="right"
                            sortDirection={
                                sortField === 'createdAt'
                                    ? (sortDirection as SortDirectionType)
                                    : undefined
                            }
                            onSortChange={handleOnSortChange('createdAt')}
                        >
                            {translate('common.table.createdTime')}
                        </TableHeading>
                        <TableHeading>{translate('common.table.status')}</TableHeading>
                        <TableHeading align="right">
                            {translate('common.table.action')}
                        </TableHeading>
                    </tr>
                </thead>

                <tbody>
                    {data.items.map((item, idx) => (
                        <TableRow key={item.id || idx}>
                            <TableCell isBold>
                                <Link
                                    href={PAGE.postPreview.replace(':id', String(item.id))}
                                    target="_blank"
                                    className="underline"
                                >
                                    {item.title}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-1 align-bottom">
                                    {((): React.ReactNode => {
                                        const MAXIMUM_DISPLAYED_TOPICS = 2;

                                        return (
                                            <>
                                                {item.topicId
                                                    .map((id) =>
                                                        topics.find((topic) => topic.id === id)
                                                    )
                                                    .filter((topic) => !isEmpty(topic))
                                                    .slice(0, MAXIMUM_DISPLAYED_TOPICS)
                                                    .map((topic) => (
                                                        <Tag key={topic?.id} variant="outline">
                                                            {topic?.name.en}
                                                        </Tag>
                                                    ))}
                                                {item.topicId.length > MAXIMUM_DISPLAYED_TOPICS &&
                                                    `(+${
                                                        item.topicId.length -
                                                        MAXIMUM_DISPLAYED_TOPICS
                                                    })`}
                                            </>
                                        );
                                    })()}
                                </div>
                            </TableCell>
                            <TableCell align="right">
                                {new Date(item.createdAt).toLocaleString('en-US', {
                                    hour12: false,
                                })}
                            </TableCell>
                            <TableCell>
                                <StatusTag status={item.status} />
                            </TableCell>
                            <TableCell align="right">
                                <ActionMenu
                                    actions={[
                                        {
                                            label: 'View',
                                            onSelect: handleNavigateToViewPost(String(item.id)),
                                        },
                                        {
                                            label: translate('common.table.actionEdit'),
                                            onSelect: () => onEdit(item.id),
                                        },
                                        {
                                            label: translate('common.label.delete'),
                                            onSelect: showConfirmationDialog,
                                        },
                                    ]}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <FormPagination
                name="page"
                total={data.total}
                itemsPerPage={DEFAULT_ITEMS_NUMBER_PER_PAGE}
                onChange={fetch}
            />
        </>
    );
};

export default PostsTable;
