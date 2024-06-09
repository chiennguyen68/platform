import { Button } from '@/components/kit/button';
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

const ComingSoonDialog = (): JSX.Element => {
    const translate = useLocale();
    const {
        isShowComingSoonDialog,
        hideComingSoonDialog,
        showComingSoonDialog,
    } = useAppProvider();

    const handleDialogOpenStateChange = (open: boolean): void => {
        if (open) showComingSoonDialog();
        else hideComingSoonDialog();
    };

    return (
        <Dialog
            open={isShowComingSoonDialog}
            onOpenChange={handleDialogOpenStateChange}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{translate('comingSoon.title')}</DialogTitle>
                    <DialogDescription>
                        {translate('comingSoon.message')}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button variant="primary" onClick={hideComingSoonDialog}>
                        {translate('common.label.close')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ComingSoonDialog;
