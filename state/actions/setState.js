export const setState = (state, set) => (payload) => {
    set(payload);
    return true;
};
