import PublicLayout from '@/layouts/public';

export default function PreviewLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return <PublicLayout>{children}</PublicLayout>;
}
