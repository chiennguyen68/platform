import Footer from '@/components/other/footer';
import { useParams, useRouter } from 'next/navigation';
import { PAGE } from '@/constants/common.constant';
import { useFormProvider } from '@/hooks/useFormProvider.hook';
import { postService } from '@/services/post.service';
import { useToast } from '@/components/kit/toast/useToast';
import { useLocale } from '@/hooks/useLocale.hook';

const PostEditFooter = (): JSX.Element => {
    const navigate = useRouter();
    const form = useFormProvider();
    const translate = useLocale();
    const { toast } = useToast();
    const { id } = useParams();

    const handleNavigateToTheList = (): void => {
        navigate.push(PAGE.listPosts);
    };

    const handleEditPost = async (): Promise<void> => {
        if (!form.validateAll() || form.value('isProcessing')) {
            return;
        }
        form.updateFieldValue('isProcessing', true);
        const res = await postService.editPost({
            id: id as string,
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
                    description: translate('postsManagement.actionEditPostSuccess'),
                    duration: 2500,
                });
                form.updateFieldValue('isProcessing', false);
                navigate.back();
                break;
            case 1:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionEditPostFail'),
                    description: translate('postsManagement.typePostFail.code01'),
                    duration: 2500,
                });
                form.updateFieldValue('isProcessing', false);
                break;
            case 2:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionEditPostFail'),
                    description: translate('postsManagement.typePostFail.code02'),
                    duration: 2500,
                });
                form.updateFieldValue('isProcessing', false);
                break;
            default:
                toast({
                    variant: 'error',
                    title: translate('postsManagement.actionEditPostFail'),
                    description: translate('postsManagement.typePostFail.serverError'),
                    duration: 2500,
                });
                form.updateFieldValue('isProcessing', false);
                break;
        }
    };

    return (
        <Footer
            primaryButtonText={translate('common.label.save')}
            onClickCancelButton={handleNavigateToTheList}
            onClickPrimaryButton={handleEditPost}
            isDisablePrimaryButton={Boolean(form.value('isProcessing'))}
        />
    );
};

export default PostEditFooter;
