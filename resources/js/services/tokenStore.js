const ACCESS_KEY = "uijdjdjdjdsjkjdsjkjkhshfhfjjkajdjkfjka";

function getToken() {
    const token = window.localStorage.getItem(ACCESS_KEY);
    if (!!token) return token;
    return null;
}

function setToken(token) {
    window.localStorage.setItem(ACCESS_KEY, token);
}

function removeToken() {
    window.localStorage.removeItem(ACCESS_KEY);
}

export default {
    getToken,
    setToken,
    removeToken,
};
