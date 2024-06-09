'use client';

import React from 'react';
import PageTitleComponent from '@/components/other/page-title';
import ListPostsMainContent from './main-content';
import { useLocale } from '@/hooks/useLocale.hook';
import { Plus as PlusIcon } from 'lucide-react';
import { Button } from '@/components/kit/button';
import { PostsContextProvider } from './context';
import { FormProvider } from '@/providers/form.provider';
import { useRouter } from 'next/navigation';
import { PAGE } from '@/constants/common.constant';
import { useAppProvider } from '@/hooks/useAppProvider.hook';

const ListPostsTemplate = (): JSX.Element => {
    const translate = useLocale();
    const navigate = useRouter();
    const { cache } = useAppProvider();

    const handleNavigateToPostCreation = (): void => {
        navigate.push(PAGE.postCreation);
    };

    return (
        <PostsContextProvider>
            <FormProvider
                schema={{
                    search: {
                        type: 'string',
                        value: String(cache.get('post.list.search') || ''),
                    },
                    topic: {
                        type: 'list',
                        value: Array.isArray(cache.get('post.list.topic')) ? cache.get('post.list.topic') : [],
                    },
                    status: {
                        type: 'string',
                        value: String(cache.get('post.list.status') || 'all'),
                    },
                    page: {
                        type: 'number',
                        value: Number(cache.get('post.list.page') || 0),
                    },
                    sortField: {
                        type: 'string',
                        value: 'createdAt',
                    },
                    sortDirection: {
                        type: 'string',
                        value: 'des',
                    },
                }}
            >
                <PageTitleComponent
                    title={translate('postsManagement.title')}
                    description={translate('postsManagement.description')}
                    extra={
                        <Button onClick={handleNavigateToPostCreation}>
                            <PlusIcon size={18} />
                            {translate('postsManagement.createPost')}
                        </Button>
                    }
                />
                <ListPostsMainContent />
            </FormProvider>
        </PostsContextProvider>
    );
};

export default ListPostsTemplate;
