import { AppProvider } from '@/providers/app.provider';

interface IProps {
    children?: React.ReactNode;
}

const PublicLayout = ({ children }: IProps): JSX.Element => {
    return <AppProvider>{children}</AppProvider>;
};

export default PublicLayout;
