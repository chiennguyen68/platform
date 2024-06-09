'use client';

import PostEditMainContent from './main-content';
import { FormProvider } from '@/providers/form.provider';
import { usePostSchema } from '../common/usePostSchema';

const PostEditTemplate = (): JSX.Element => {
    return (
        <FormProvider schema={usePostSchema()}>
            <PostEditMainContent />
        </FormProvider>
    );
};

export default PostEditTemplate;
