import axios from "axios";
import { API_URL } from "./htt";

export function allUsers() {
    return axios.get(`${API_URL}/users`);
}

export function getUser(id) {
    return axios.get(`${API_URL}/users/${id}`);
}

export function updateUser(id, data) {
    return axios.put(`${API_URL}/users/${id}`, data);
}

export function addUser(data) {
    return axios.post(`${API_URL}/users`, data);
}

export function deleteUser(id) {
    return axios.delete(`${API_URL}/users/${id}`);
}

export function toggleIsAdmin(id) {
    return axios.put(`${API_URL}/users/toggle-is-admin/${id}`);
}

export function checkIsAdmin(user) {
    return (
        user.roles.find(
            (r) => r.name === "administrator" || r.name === "superadministrator"
        ) !== undefined
    );
}
