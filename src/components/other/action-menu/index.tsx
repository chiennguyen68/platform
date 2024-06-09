'use client';

import styles from './styles.module.scss';
import { MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/kit/dropdown-menu';

interface IAction {
    label: string;
    onSelect?: VoidFunction;
}

interface IProps {
    actions: IAction[];
}

const ActionMenu = ({ actions }: IProps): JSX.Element => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={styles.triggerButton}>
                    <MoreVertical size={18} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                {actions.map((item) => (
                    <DropdownMenuItem key={item.label} onSelect={item.onSelect}>
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionMenu;
