/* eslint-disable */

const sizeConverstionTable = {
    XS: ['XS / 0', 'XS / 2', '25-26 / XS'],
    S: ['S / 4', 'S / 6', '27-29 / S'],
    M: ['M / 8', 'M / 10', '29-32 / M'],
    L: ['L / 12', 'L / 14', '33-37 / L'],
    XL: ['XL / 16', 'XL / 18', '38-41 / XL'],
    XXL: ['XXL / 22', 'XXL / 24', '42-46 / XXL', '33-37 / L', '38-41 / XL', '42-46 / XXL', '53-58 / 4XL'],
    '4-5': ['4 / 212', '5 / 220'],
    '5-6': ['5 / 220', '6 / 229'],
    '6-7': ['6 / 229', '7 / 237'],
    '7-8': ['7 / 237', '8 / 246'],
    '8-9': ['8 / 246', '9 / 254'],
    '9-10': ['9 / 254', '10 / 262'],
    '10-11': ['10 / 262', '11 / 270']
};

const getSizeCatagory = (str) => {
    switch (true) {
        case /XS|0|24|25|26/.test(str):
            return 'XS';
        case /S|4|6|27|28|29/.test(str):
            return 'S';
        case /M|8|10|30|31|32/.test(str):
            return 'M';
        case /L|12|14|33|34|35|36|37/.test(str):
            return 'L';
        case /XL|16|18|38|39|40|41/.test(str):
            return 'XL';
        case /XXL|22|23|24|42|43|44|45|46|35\+/.test(str):
            return 'XXL';
        default:
            return str;
    }
};

export const convertSizes = (arr) => {
    return arr
        .map((str) => {
            const sizeCategory = getSizeCatagory(str);
            return sizeConverstionTable[sizeCategory];
        })
        .flat();
};

