import config from '../data/env';
const baseUrl = config[0].userApiUrl;

export function PostData(userData){
    let BaseURL= `${baseUrl}/login/twitter`;

    return new Promise((resolve, reject) =>{           
        fetch(BaseURL, {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((res) => {
        resolve(res);
        })
        .catch((error) => {
        reject(error);
        });
    });
}