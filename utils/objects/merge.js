/* eslint-disable guard-for-in */
export const merge = (...sources) => {
    const target = {};
    for (const source of sources) {
        for (let key in source) {
            let vs = source[key],
                vt = target[key];
            /*eslint-disable */
            if (Object(vs) == vs && Object(vt) === vt && !Array.isArray(vs)) {
                target[key] = merge(vt, vs);
                continue;
            }
            target[key] = source[key];
        }
    }
    return target;
};

