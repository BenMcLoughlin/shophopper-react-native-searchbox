import * as SecureStore from 'expo-secure-store';
import NavigationService from "./navigationService";

/**
 * @param token
 * @returns {*}
 */
function setToken(token) {
    return SecureStore.setItemAsync('simplyBenefitsToken', token);
}

/**
 * @returns {*}
 */
function getToken() {
    return SecureStore.getItemAsync('simplyBenefitsToken');
}

/**
 * @returns {*}
 */
async function removeToken() {
    await SecureStore.deleteItemAsync('sb-is-dep');
    await SecureStore.deleteItemAsync('simplyBenefitsToken');
    return true;
}

/**
 */
async function logout() {
    await removeToken();
    NavigationService.navigate('Login');
}

/**
 * @param {*} token
 */
async function setPasswordWasReset(email) {
    if (typeof email === 'string' && email.length > 0) {
        await SecureStore.setItemAsync('sb-pw-reset', email);
    }
}

/**
 * @returns {string | null}
 */
function passwordWasReset() {
    return SecureStore.getItemAsync('sb-pw-reset');
}

/**
 *
 */
function removePasswordWasReset() {
    SecureStore.deleteItemAsync('sb-pw-reset');
}

export {
    setToken,
    getToken,
    removeToken,
    logout,
    setPasswordWasReset,
    passwordWasReset,
    removePasswordWasReset
};