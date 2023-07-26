import en_US from 'strings/en_US.json';

export const getResourcesJson = () => {
    return {
        "en_US": {
            common: en_US
        }
    }
}

export const getCurrentLocale = () => {
    return 'en_US';
}