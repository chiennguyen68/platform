import { Nunito } from 'next/font/google';
import { Metadata } from 'next';

import './globals.scss';

const font = Nunito({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
    title: 'The platform - Content management system',
    description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    );
}
