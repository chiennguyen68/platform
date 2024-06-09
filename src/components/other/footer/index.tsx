import { cn } from '@/helpers/utils.helper';
import { Button } from '@/components/kit/button';
import styles from './styles.module.scss';
import { useLocale } from '@/hooks/useLocale.hook';

interface IProps {
    className?: string;
    primaryButtonText?: string;
    hiddenButton?: ('cancel' | 'primary')[];
    isDisablePrimaryButton?: boolean;
    onClickPrimaryButton?: VoidFunction;
    onClickCancelButton?: VoidFunction;
}

const Footer = ({
    className,
    primaryButtonText,
    hiddenButton,
    isDisablePrimaryButton,
    onClickCancelButton,
    onClickPrimaryButton,
}: IProps): JSX.Element => {
    const translate = useLocale();


    return (
        <div className={cn(styles.container, className)}>
            {!hiddenButton?.find((item) => item === 'cancel') && (
                <Button onClick={onClickCancelButton}>{translate('common.label.close')}</Button>
            )}
            {!hiddenButton?.find((item) => item === 'primary') && (
                <Button variant="primary" disabled={isDisablePrimaryButton} onClick={onClickPrimaryButton}>
                    {primaryButtonText || '-'}
                </Button>
            )}
        </div>
    );
};

export default Footer;
