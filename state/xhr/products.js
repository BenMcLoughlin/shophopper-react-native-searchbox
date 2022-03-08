import request from './xhr/request';

function getGeneric(body) {
    const options = {
        endpoint: '/api/search',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options).then(resolve).catch(reject);
    });
}

function searchProducts(body) {
    const options = {
        endpoint: '/api/searchProducts',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options).then(resolve).catch(reject);
    });
}

function searchProductById(body) {
    const options = {
        endpoint: '/api/searchProductById',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options).then(resolve).catch(reject);
    });
}

function getHotItems(body) {
    const options = {
        endpoint: '/api/getHotItems',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options).then(resolve).catch(reject);
    });
}

function getColumns(body) {
    const options = {
        endpoint: '/api/getColumns',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options).then(resolve).catch(reject);
    });
}

function dailyDiscovery(body) {
    const options = {
        endpoint: '/api/dailyDiscovery',
        method: 'POST',
        body
    };

    return new Promise((resolve, reject) => {
        request(options).then(resolve).catch(reject);
    });
}

export {
    getGeneric,
    searchProducts,
    searchProductById,
    getHotItems,
    getColumns,
    dailyDiscovery
};
