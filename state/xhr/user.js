import request from './request';

function login(body, isLoginMode) {
    const options = {
        endpoint: `/api/auth/${isLoginMode ? 'login' : 'signup'}`,
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options).then(resolve).catch(reject);
    });
}

export {
    login
};
