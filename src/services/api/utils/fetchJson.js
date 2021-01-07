import fetch from './fetchWithBearerToken';
import download from "downloadjs";
import constant from "../../../shared/constant";

const handleSuccess = (response, resolveFunc) => {
    const responseContentType = response.headers.get('Content-Type');

    if (responseContentType && responseContentType.indexOf('application/json') !== -1) {
        response.json().then(resolveFunc);
    }
    else if (responseContentType == 'text/plain; charset=utf-8') {
        response.text().then(resolveFunc);
    }
    else {
        resolveFunc();
    }
};

const handleError = (response, rejectFunc) => {
    const responseContentType = response.headers.get('Content-Type');
    if (responseContentType && responseContentType.indexOf('text/plain') !== -1) {
        response.text().then(text => rejectFunc({ status: response.status, message: text }));
    } else if (responseContentType && responseContentType.indexOf('application/json') !== -1) {
        response.json().then(json => rejectFunc({ status: response.status, message: json }));
    } else {
        rejectFunc({ status: response.status, message: 'An error occured' });
    }
};

const fetchJson = (input, init, type) => {
    const headersMain = {
        'Access-Control-Allow-Origin': 'https://globallineupweb.azurewebsites.net',
        // 'Access-Control-Allow-Origin': 'http://localhost:44346',
        'Content-Type': 'application/json'
    };

    const newHeaders = type != 'imageUpload' ? headersMain : {};

    return new Promise((resolve, reject) => {
        fetch(input, {
            ...init,
            credentials: 'include',
            headers: newHeaders
        }).then(response => {
            if (response.ok) {
                handleSuccess(response, resolve);
            } else {
                handleError(response, reject);
            }
           
            if(type == constant.DOWNLOAD_ATTACHMENT)
                return response.blob();
                
        })
        .then( (blob) => {
            if(type == constant.DOWNLOAD_ATTACHMENT)
                download(blob, type)
        })
        .catch((error)=>{
            if(error == 'TypeError: Failed to fetch'){
                reject({ status : 401, message: 'An error occured' });
            }
        }
        )
    });
};

export default fetchJson;
