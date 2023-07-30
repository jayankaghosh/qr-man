import { getItem, setItem } from "util/browser-database";
import {sendRequest} from "util/request";

const TOKEN_KEY = 'authToken';

export const FORM_TYPE_LOGIN = 'login';
export const FORM_TYPE_CREATE = 'create';

export const getAuthenticationToken = () => {
    return getItem(TOKEN_KEY);
}

export const setAuthenticationToken = token => {
    setItem(TOKEN_KEY, token)
}

export const logout = () => {
    setAuthenticationToken(null);
    window.location.href = '/authenticate';
}

export const onFormSubmit = async (event, formType = FORM_TYPE_LOGIN) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
        let url;
        if (formType === FORM_TYPE_LOGIN) {
            url = '/user/login'
        } else {
            url = '/user/create'
        }
        const { token } = await sendRequest(url, 'POST', data);
        setAuthenticationToken(token)
        window.location.href = '/';
    } catch (error) {
        console.log(error);
    }
}