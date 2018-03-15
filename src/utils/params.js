import config from './config'
const { prefix } = config

export function createParams(params) {
    let reString = "";
    for (let key in params) {
        reString += key + "=" + params[key] + "&";
    }
    return reString;
}

export function parseParams(params) {
    if (params.startsWith('?')) {
        params = params.substring(1, params.length);
    }
    let array = params.split('&');
    let reValue = {};
    for (let itemIndex in array) {
        let item = array[itemIndex];
        let arrayItem = item.split('=');
        reValue[arrayItem[0]] = arrayItem[1];
    }

    return reValue;
}

export function addToken(params) {
    let user = JSON.parse(window.localStorage.getItem(`${prefix}user`));
    if (user === null) {
        return params;
    }
    const { token } = user;
    if (token === undefined) {
        return params;
    }
    if (params.endsWith('?')) {
        return params + "token=" + token;
    }
    else if (!params.includes('?')) {
        return params + "?token=" + token;
    }
    else {
        return params + "&token=" + token;
    }
}