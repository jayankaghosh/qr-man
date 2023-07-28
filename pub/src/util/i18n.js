import { getItem, setItem } from "util/browser-database";
import en_US from 'strings/en_US.json';

const CURRENT_LOCALE_KEY = 'currentLocale';

export const getResourcesJson = () => {
    return {
        "en_US": {
            common: en_US
        }
    }
}

export const getCurrentLocale = () => {
    return getItem(CURRENT_LOCALE_KEY) || 'en_US';
}

export const setCurrentLocale = locale => {
    setItem(CURRENT_LOCALE_KEY, locale);
}