/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React from 'react';
import ComingSoonDialog from '@/components/other/coming-soon';
import Deboucer from '@/services/utils.service';
import GlobalLoader from '@/components/other/global-loader';
import { LanguageEnum } from '@/@types/enum.type';
import { storageService } from '@/services/storage.service';
import { LANGUAGE_STORAGE_KEY } from '@/constants/common.constant';
import { topicService } from '@/services/topic.service';
import { ITopic } from '@/@types/topic.type';
import { getObjectFieldByKeyChain } from '@/helpers/object.helper';
import { isEmpty } from '@/helpers/utils.helper';

interface IAppProviderProps {
    children?: React.ReactNode;
}

interface IAppCache {
    get: (key: string) => unknown;
    set: (key: string, value: unknown) => void;
    remove: (key: string) => void;
    clear: () => void;
}

export interface IAppContextProps {
    lang: LanguageEnum;
    isShowComingSoonDialog: boolean;
    topics: ITopic[];
    cache: IAppCache;
    updateLanguage: (lang: LanguageEnum) => void;
    showComingSoonDialog: VoidFunction;
    hideComingSoonDialog: VoidFunction;
}

const DEFAULT_APP_CONTEXT_VALUE: IAppContextProps = {
    lang: LanguageEnum.en,
    isShowComingSoonDialog: false,
    topics: [],
    cache: {
        get: () => undefined,
        set: () => undefined,
        remove: () => undefined,
        clear: () => undefined,
    },
    updateLanguage: () => undefined,
    showComingSoonDialog: () => undefined,
    hideComingSoonDialog: () => undefined,
};

export const AppContext = React.createContext<IAppContextProps>(DEFAULT_APP_CONTEXT_VALUE);

export const AppProvider = ({ children }: IAppProviderProps): JSX.Element => {
    const [isPreProcessing, setIsPreProcessing] = React.useState<boolean>(true);
    const [topics, setTopics] = React.useState<ITopic[]>([]);
    const [cachedData, setCachedData] = React.useState<Record<string, unknown>>({});
    const [lang, updateLanguage] = React.useState<LanguageEnum>(DEFAULT_APP_CONTEXT_VALUE.lang);
    const [isShowComingSoonDialog, setIsShowComingSoonDialog] = React.useState<boolean>(false);

    const deboucer = new Deboucer();

    const handleUpdateLanguage = (l: LanguageEnum): void => {
        storageService.set(LANGUAGE_STORAGE_KEY, String(l));
        updateLanguage(l);
    };

    React.useEffect(() => {
        storageService.get(LANGUAGE_STORAGE_KEY).then((value) => {
            updateLanguage(value === LanguageEnum.vi ? LanguageEnum.vi : LanguageEnum.en);

            topicService.getAllTopics().then((res) => {
                setTopics(res);
                deboucer.exec(() => {
                    setIsPreProcessing(false);
                });
            });
        });

        return deboucer.destroy;
    }, []);

    if (isPreProcessing) return <GlobalLoader />;

    return (
        <AppContext.Provider
            value={{
                lang,
                isShowComingSoonDialog,
                topics,
                updateLanguage: handleUpdateLanguage,
                showComingSoonDialog: (): void => {
                    setIsShowComingSoonDialog(true);
                },
                hideComingSoonDialog: (): void => {
                    setIsShowComingSoonDialog(false);
                },
                cache: {
                    get: (keyChain: string): unknown => {
                        return getObjectFieldByKeyChain(cachedData, keyChain);
                    },
                    clear: (): void => {
                        setCachedData({});
                    },
                    set: (keyChain: string, value: unknown): void => {
                        setCachedData((current) => {
                            const _current = { ...current };
                            const splitedKeyChain = keyChain.split('.');
                            let obj = _current;
                            for (let i = 0; i < splitedKeyChain.length; i++) {
                                const key = splitedKeyChain[i];
                                if (i === splitedKeyChain.length - 1) {
                                    obj[key] = value;
                                } else if (isEmpty(obj[key])) {
                                    obj[key] = {};
                                    obj = Object(obj[key]);
                                } else {
                                    obj = Object(obj[key]);
                                }
                            }

                            return _current;
                        });
                    },
                    remove: (keyChain: string): void => {
                        setCachedData((current) => {
                            const _current = { ...current };
                            const splitedKeyChain = keyChain.split('.');
                            let obj = _current;
                            for (let i = 0; i < splitedKeyChain.length; i++) {
                                const key = splitedKeyChain[i];
                                if (isEmpty(obj[key])) return _current;
                                if (i !== splitedKeyChain.length - 1) {
                                    obj = Object(obj[key]);
                                } else {
                                    obj[key] = undefined;
                                }
                            }
                            return _current;
                        });
                    },
                },
            }}
        >
            {children}
            <ComingSoonDialog />
        </AppContext.Provider>
    );
};
