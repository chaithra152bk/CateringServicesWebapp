import constant from "../shared/constant";

export const setItem = (item, selectedValue) => {
    sessionStorage.setItem(item, selectedValue);
};

export const getItem = (item) => {
    const value = sessionStorage.getItem(item);
    return value;
};

export const clear = () => {
    const value = sessionStorage.clear();
    return value;
};

export const getAuthToken = () => {
    return getItem(constant.ACCESS_TOKEN);
};

export const setAuthToken = (token) => {
    setItem(constant.ACCESS_TOKEN, token);
};

export const setUserData = (token) => {
    setItem('userData', token);
};
export const getUserData = () => {
    return getItem('userData');
};