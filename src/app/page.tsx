import { PAGE } from '@/constants/common.constant';
import { redirect } from 'next/navigation';

export default function Page(): void {
    redirect(PAGE.listPosts);
}
