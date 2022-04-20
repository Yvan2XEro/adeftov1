import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_URL } from "./htt";
import tokenStore from "./tokenStore";

async function login(credentials) {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const { token } = response.data;
        tokenStore.setToken(token);
        setAxiosToken(token);
        return Promise.resolve(response);
    } catch (error) {
        tokenStore.removeToken();
        console.log("Login failled!");
        return Promise.reject(error);
    }
}

async function register(data) {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        const { token } = response.data;
        tokenStore.setToken(token);
        setAxiosToken(token);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

function isAuthenticated() {
    const token = tokenStore.getToken();
    if (!token) {
        return false;
    }
    const { exp } = jwtDecode(token);
    return exp * 1000 > new Date().getTime();
}

function logout() {
    tokenStore.removeToken();
    delete axios.defaults.headers["Authorization"];
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function getUser() {
    return axios.get(`${API_URL}/user`);
}

function updateUser(data) {
    return axios.put(`${API_URL}/user`, data);
}

function setup() {
    const token = tokenStore.getToken();
    if (token !== null) {
        console.log("Token found!", typeof token);
        try {
            const { exp } = jwtDecode(token);
            if (exp * 1000 > new Date().getTime()) setAxiosToken(token);
            else {
                tokenStore.removeToken();
            }
        } catch (error) {
            console.log("Token is invalid!");
        }
    }
}

export default {
    login,
    logout,
    setup,
    getUser,
    updateUser,
    register,
    isAuthenticated,
};
