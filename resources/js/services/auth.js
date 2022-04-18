import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "./htt";
import tokenStore from "./tokenStore";

async function login(credentials) {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token } = response.data.token;
        tokenStore.setToken(token);
        setAxiosToken(token);
        return Promise.resolve(response);
    } catch (error) {
        tokenStore.removeToken();
        console.log("Login failled!");
        return Promise.reject(error);
    }
}

function isAuthenticated() {
    const token = tokenStore.getToken();
    if (token) {
        const { exp } = jwtDecode(token);
        if (exp * 1000 > new Date().getTime()) return true;
    }
    return false;
}

function logout() {
    tokenStore.removeToken();
    delete axios.defaults.headers["Authorization"];
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = tokenStore.getToken();
    if (token) {
        const { exp } = jwtDecode(token);
        if (exp * 1000 > new Date().getTime()) setAxiosToken(token);
    }
}

export default {
    login,
    logout,
    setup,
    isAuthenticated,
};
