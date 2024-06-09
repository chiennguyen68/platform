import Footer from '@/components/other/footer';
import { useRouter } from 'next/navigation';
import { PAGE } from '@/constants/common.constant';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { postService } from '@/services/post.service';
import { useToast } from '@/components/kit/toast/useToast';
import { useLocale } from '@/hooks/useLocale.hook';
import { useAppProvider } from '@/hooks/useAppProvider.hook';

const PostCreateFooter = (): JSX.Element => {
    const navigate = useRouter();
    const form = useFormProvider();
    const translate = useLocale();
    const { toast } = useToast();
    const { cache } = useAppProvider();

    const handleNavigateToTheList = (): void => {
        navigate.push(PAGE.listPosts);
    };

    const handleCreatePost = async (): Promise<void> => {
        if (!form.validateAll() || form.value('isProcessing')) {
            return;
        }
        form.updateFieldValue('isProcessing', true);
        const res = await postService.createPost({
            title: form.value('title') as string,
            description: form.value('description') as string,
            topic: form.value('topic') as string,
            status: form.value('status') as string,
            content: form.value('content') as string,
        });

        switch (res.code) {
            case 0:
                toast({
                    variant: 'success',
                    title: translate('common.label.success'),
                    description: translate(
                        'postsManagement.actionCreatePostSuccess'
                    ),
                    duration: 2500,
                });
                form.updateFieldValue('isProcessing', false);
                cache.remove('post.list.search');
                cache.remove('post.list.topic');
                cache.remove('post.list.status');
                cache.remove('post.list.page');
                navigate.back();
                break;
            case 1:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionCreatePostFail'),
                    description: translate(
                        'postsManagement.typePostFail.code01'
                    ),
                    duration: 2500,
                });
                form.updateFieldValue('isProcessing', false);
                break;
            case 2:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionCreatePostFail'),
                    description: translate(
                        'postsManagement.typePostFail.code02'
                    ),
                    duration: 2500,
                });
                form.updateFieldValue('isProcessing', false);
                break;
            default:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionCreatePostFail'),
                    description: translate(
                        'postsManagement.typePostFail.serverError'
                    ),
                    duration: 2500,
                });
                form.updateFieldValue('isProcessing', false);
                break;
        }
    };

    return (
        <Footer
            primaryButtonText={translate('postsManagement.createPost')}
            onClickCancelButton={handleNavigateToTheList}
            onClickPrimaryButton={handleCreatePost}
            isDisablePrimaryButton={Boolean(form.value('isProcessing'))}
        />
    );
};

export default PostCreateFooter;
