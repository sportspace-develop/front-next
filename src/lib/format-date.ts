import {Locale, isValid, format} from 'date-fns';
import localeRu from 'date-fns/locale/ru';
import deepmerge from 'deepmerge';

export type TSettings = {
    locale: Locale;
    format: string;
    formatter: (date: Date, format: string, options: {locale: Locale}) => string;
};

export const defaultSettings: TSettings = {
    locale: localeRu as unknown as Locale,
    format: 'HH:mm:ss dd.MM.yyyy',
    formatter: format,
};

export const setDefaultSettings = <S extends TSettings = TSettings>(
    payloadSettings: Partial<S>,
) => {
    Object.assign(defaultSettings, payloadSettings);
};

const formatDate = <S extends TSettings = TSettings>(date: Date, payloadSettings?: Partial<S>) => {
    if (isValid(date)) {
        const settings = deepmerge(defaultSettings, payloadSettings || {});

        return settings.formatter(date, settings.format, {locale: settings.locale});
    }

    return null;
};

export default formatDate;
