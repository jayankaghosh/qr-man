import { getItem, setItem } from "util/browser-database";

export const MODE_DARK = 'dark';
export const MODE_LIGHT = 'light';

export const getMode = () => {
    const mode = getItem('appMode');
    if (mode === MODE_LIGHT) {
        return MODE_LIGHT;
    } else {
        return MODE_DARK;
    }
}