'use client';

import Wrapper from '../wrapper';
import styles from './styles.module.scss';
import { useAppProvider } from '@/hooks/useAppProvider.hook';
import { LanguageEnum } from '@/@types/enum.type';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/kit/select';

interface IProps {
    isOnPublicPage?: boolean;
}

const Header = ({ isOnPublicPage }: IProps): JSX.Element => {
    const { lang, updateLanguage } = useAppProvider();

    const handleOnChangeLanguage = (value: string): void => {
        updateLanguage(value as LanguageEnum);
    };

    return (
        <div className={styles.container}>
            <Wrapper className={styles.wrapper}>
                <div className={styles.company}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 62.5"
                        enableBackground="new 0 0 50 50"
                        xmlSpace="preserve"
                        width={32}
                        height={32}
                    >
                        <g>
                            <path d="M32.9,2.9C28,0.3,22,0.3,17.1,2.9c-20.9,10.9-1.5,42.6,6.8,43.2l-0.6,2.3c-0.1,0.2,0.1,0.4,0.3,0.3c1.1-0.4,1.6,0.3,3,0.3   c0.1,0,0.3-0.2,0.2-0.3L26,46.2C35,45.5,53.5,13.7,32.9,2.9z M27.1,7.4c-0.5-0.2-0.8-0.7-0.6-1.3c0.2-0.5,0.8-0.8,1.3-0.6   c4.1,1.4,10.6,7.9,9.9,19.5c0,0.7,0,1,0,1s0-0.4,0-1C37.2,13.7,31.1,8.4,27.1,7.4z" />
                        </g>
                    </svg>
                    The platform
                </div>

                {!isOnPublicPage && (
                    <div className={styles.action}>
                        <Select value={lang} onValueChange={handleOnChangeLanguage}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={LanguageEnum.en}>EN</SelectItem>
                                <SelectItem value={LanguageEnum.vi}>VI</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className={styles.user}>
                            <div className={styles.info}>
                                <h3>Whiskey</h3>
                            </div>
                            <div
                                className={styles.avatar}
                                style={{
                                    backgroundImage: 'url(/assets/pattern.svg)',
                                }}
                            />
                        </div>
                    </div>
                )}
            </Wrapper>
        </div>
    );
};

export default Header;
