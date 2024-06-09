import React from 'react';
import ConfirmationDialog from './confirmation';
import PostsFilter from './filter';
import PostsTable from './table';
import { useAppProvider } from '@/hooks/useAppProvider.hook';
import { useFormProvider } from '@/hooks/useFormProvider.hook';

const ListPostsMainContent = (): JSX.Element => {
    const form = useFormProvider();
    const { cache } = useAppProvider();

    React.useEffect(() => {
        cache.set('post.list.search', form.value('search'));
        cache.set('post.list.topic', form.value('topic'));
        cache.set('post.list.status', form.value('status'));
        cache.set('post.list.page', form.value('page'));
    }, [
        form.value('search'),
        form.value('topic'),
        form.value('status'),
        form.value('page'),
    ]);

    return (
        <>
            <PostsFilter />
            <PostsTable />
            <ConfirmationDialog />
        </>
    );
};

export default ListPostsMainContent;
