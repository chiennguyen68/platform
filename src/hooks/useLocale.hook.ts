import viLocale from '../locales/vi.locale.json';
import enLocale from '../locales/en.locale.json';
import { useAppProvider } from './useAppProvider.hook';
import { LanguageEnum } from '@/@types/enum.type';

export const translate = (lang: LanguageEnum, translateKey: string): string => {
    const locale: Record<string, unknown> =
        lang === LanguageEnum.vi ? Object(viLocale) : Object(enLocale);

    const value = locale[translateKey];
    return String(value || '--');
};

export const useLocale = (): ((translationKey: string) => string) => {
    const { lang } = useAppProvider();
    return (translateKey: string): string => translate(lang, translateKey);
};
