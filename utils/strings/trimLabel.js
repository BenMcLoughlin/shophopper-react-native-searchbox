export const trimLabel = (str) => {
    if (str.length <= 20) return str;
    return str.split('').slice(0, 20).join('');
};
