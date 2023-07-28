import { getItem, setItem } from "util/browser-database";

const TOKEN_KEY = 'authToken';

export const getAuthenticationToken = () => {
    return getItem(TOKEN_KEY);
}

export const setAuthenticationToken = token => {
    setItem(TOKEN_KEY, token)
}