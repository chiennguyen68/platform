import Header from '@/components/other/header';
import Sidebar from '@/components/other/sidebar';
import Wrapper from '@/components/other/wrapper';
import styles from './styles.module.scss';
import { AppProvider } from '@/providers/app.provider';
import { Toaster } from '@/components/kit/toast/toaster';

interface IProps {
    children?: React.ReactNode;
}

const AuthenticatedLayout = ({ children }: IProps): JSX.Element => {
    return (
        <AppProvider>
            <Header />
            <Wrapper className={styles.container}>
                <div className={styles.body}>
                    <Sidebar />
                    <div className={styles.mainContent}>{children}</div>
                </div>
            </Wrapper>
            <Toaster />
        </AppProvider>
    );
};

export default AuthenticatedLayout;
