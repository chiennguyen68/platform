'use client';

import PageTitle from '@/components/other/page-title';
import PostForm from '../common/post';
import PostEditFooter from './footer';
import { useLocale } from '@/hooks/useLocale.hook';
import { useEffect } from 'react';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { postService } from '@/services/post.service';
import { useToast } from '@/components/kit/toast/useToast';
import { useParams } from 'next/navigation';

const PostEditMainContent = (): JSX.Element => {
    const translate = useLocale();
    const form = useFormProvider();
    const { id } = useParams();
    const { toast } = useToast();

    const getPostDetails = async (): Promise<void> => {
        form.updateFieldValue('isProcessing', true);
        const res = await postService.detailPost({ id: String(id) });
        switch (res.code) {
            case 0:
                form.updateFieldValue('title', res.data?.title);
                form.updateFieldValue('description', res.data?.description);
                form.updateFieldValue('topic', res.data?.topicId);
                form.updateFieldValue('status', res.data?.status);
                form.updateFieldValue('content', res.data?.content);
                form.updateFieldValue('isProcessing', false);
                break;
            case 1:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionCreatePostFail'),
                    description: translate('postsManagement.typePostFail.code01'),
                    duration: 2500,
                });

                break;
            case 2:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionCreatePostFail'),
                    description: translate('postsManagement.typePostFail.code02'),
                    duration: 2500,
                });

                break;
            default:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionCreatePostFail'),
                    description: translate('postsManagement.typePostFail.serverError'),
                    duration: 2500,
                });

                break;
        }
    };

    useEffect(() => {
        getPostDetails();
    }, []);
    return (
        <>
            <PageTitle
                title={`${translate('common.label.post')}: ${form.value('title') || '--'}`}
                description={translate('postsManagement.edit.description')}
            />
            <PostForm />
            <PostEditFooter />
        </>
    );
};

export default PostEditMainContent;
