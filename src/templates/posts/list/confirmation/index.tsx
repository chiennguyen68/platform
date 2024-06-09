import React from 'react';
import { Button } from '@/components/kit/button';
import { PostsContext } from '../context';
import { useAppProvider } from '@/hooks/useAppProvider.hook';
import { useLocale } from '@/hooks/useLocale.hook';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/kit/dialog';

const ConfirmationDialog = (): JSX.Element => {
    const translate = useLocale();
    const { showComingSoonDialog } = useAppProvider();
    const {
        isShowConfirmationDialog,
        hideConfirmationDialog,
        showConfirmationDialog,
    } = React.useContext(PostsContext);

    const handleOnDialogOpenStateChange = (open: boolean): void => {
        if (open) showConfirmationDialog();
        else hideConfirmationDialog();
    };

    const handleDeletePost = (): void => {
        hideConfirmationDialog();
        showComingSoonDialog();
    };

    return (
        <Dialog
            open={isShowConfirmationDialog}
            onOpenChange={handleOnDialogOpenStateChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {translate('common.message.confirmation.title')}
                    </DialogTitle>
                    <DialogDescription>
                        {translate('postsManagement.deleteConfirmationMessage')}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button onClick={hideConfirmationDialog}>
                        {translate('common.label.cancel')}
                    </Button>
                    <Button variant="primary" onClick={handleDeletePost}>
                        {translate('common.label.confirm')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;
