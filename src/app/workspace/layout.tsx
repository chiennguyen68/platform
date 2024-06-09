import AuthenticatedLayout from '@/layouts/authenticated';

import '../tailwind.scss';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
