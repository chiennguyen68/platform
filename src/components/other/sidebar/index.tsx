'use client';

import styles from './styles.module.scss';
import { useLocale } from '@/hooks/useLocale.hook';
import { cn, isEmpty } from '@/helpers/utils.helper';
import { useAppProvider } from '@/hooks/useAppProvider.hook';
import { PAGE } from '@/constants/common.constant';
import { useRouter } from 'next/navigation';

interface IMenuItem {
    label: string;
    url?: string;
    isActive?: boolean;
}

const MENU: IMenuItem[] = [
    {
        label: 'common.label.posts',
        url: PAGE.listPosts,
        isActive: true,
    },
    {
        label: 'common.label.documents',
    },
    {
        label: 'common.label.forms',
    },
    {
        label: 'common.label.emailTemplates',
    },
];

const Sidebar = (): JSX.Element => {
    const translate = useLocale();
    const navigate = useRouter();
    const { showComingSoonDialog } = useAppProvider();

    const handleClickMenuItem =
        (item: IMenuItem): VoidFunction =>
            (): void => {
                if (!isEmpty(item.url)) {
                    navigate.push(String(item.url));
                } else {
                    showComingSoonDialog();
                }
            };

    return (
        <div className={styles.container}>
            <div className={styles.applications}>
                {MENU.map((item) => (
                    <div
                        key={item.label}
                        className={cn(
                            styles.item,
                            item.isActive && styles.active
                        )}
                        onClick={handleClickMenuItem(item)}
                    >
                        {translate(item.label)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
