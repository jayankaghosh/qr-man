import { getAuthenticationToken } from "./authenticate";
import store from "util/store";

export const API_PREFIX = (process.env.REACT_APP_API_URL_PREFIX || '/').replace(/^\/|\/$/g, '');

export const sendRequest = (
    uri,
    method = 'GET',
    data = null,
    headers = {},
    getRawResponse = false,
    isHandleRequestError = true
) => {
    const globalHeaders = getGlobalHeaders();
    Object.keys(globalHeaders).forEach(header => {
        if (!headers[header]) {
            headers[header] = globalHeaders[header];
        }
    });
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method,
                headers
            }
            if (data) {
                options.body = JSON.stringify(data);
            }
            let url;
            if (uri[0] === '/') {
                url = '/' + API_PREFIX + uri;
            } else {
                url = uri;
            }
            const response = await fetch(url, options);
            if (!response.ok) {
                throw response;
            }
            if (getRawResponse) {
                resolve(response);
            } else {
                const responseBody = await response.json();
                resolve(responseBody);
            }
        } catch (e) {
            console.error(e);
            const { status, statusText} = e;
            let responseBody;
            try {
                responseBody = await e.json();
            } catch(e) {
                console.error(e);
                responseBody = {
                    error: 'Something went wrong'
                }
            }
            const error = {
                status,
                statusText,
                errorMessage: responseBody.error || ''
            }
            if (isHandleRequestError) {
                handleRequestError(error);
            }
            reject(error);
        }
    });
}

const getGlobalHeaders = () => {
    const headers = {};
    const token = getAuthenticationToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

const handleRequestError = error => {
    console.error(error);
    const authenticatePath = '/authenticate';
    store.dispatch({
        type: 'SHOW_NOTIFICATION',
        message: error.errorMessage
    })
    if (error.status === 401 && window.location.pathname !== authenticatePath) {
        window.location.href = authenticatePath;
    }
}