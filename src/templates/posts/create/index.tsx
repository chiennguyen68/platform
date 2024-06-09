'use client';

import PageTitle from '@/components/other/page-title';
import PostForm from '../common/post';
import PostCreateFooter from './footer';
import { FormProvider } from '@/providers/form.provider';
import { useLocale } from '@/hooks/useLocale.hook';
import { usePostSchema } from '../common/usePostSchema';

const PostCreateTemplate = (): JSX.Element => {
    const translate = useLocale();

    return (
        <FormProvider schema={usePostSchema()}>
            <PageTitle
                title={translate('postsManagement.create.title')}
                description={translate('postsManagement.create.description')}
            />
            <PostForm />
            <PostCreateFooter />
        </FormProvider>
    );
};

export default PostCreateTemplate;
