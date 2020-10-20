class WrongLocaleError extends Error {
    constructor(locale: string) {
        super(`Wrong locale ${locale}`);
    }
}

function createRegexp(lang: string) {
    return new RegExp(`^${lang}$|^${lang}-`);
}

const RU = createRegexp('ru');
const BE = createRegexp('be');

export interface TranslationContainer<T> {
    ru: T;
    be: T;
}

export function getTranslation<T>(
    data: TranslationContainer<T>,
    lang: string,
): T {
    if (RU.test(lang)) {
        return data.ru;
    }
    if (BE.test(lang)) {
        return data.be;
    }

    throw new WrongLocaleError(lang);
}

export function setTranslation<T>(
    data: TranslationContainer<T>,
    lang: string,
    value: T,
): TranslationContainer<T> {
    if (RU.test(lang)) {
        return {
            be: data.be,
            ru: value,
        };
    }
    if (BE.test(lang)) {
        return {
            ru: data.ru,
            be: value,
        };
    }

    throw new WrongLocaleError(lang);
}
