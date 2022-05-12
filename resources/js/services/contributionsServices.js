import axios from "axios";
import { API_URL } from "./htt";

export function getAllContributions() {
    return axios.get(`${API_URL}/contributions`);
}

export function getContribution(id) {
    return axios.get(`${API_URL}/contributions/${id}`);
}

export function updateContribution(id, data) {
    return axios.put(`${API_URL}/contributions/${id}`, data);
}

export function addContribution(data) {
    return axios.post(`${API_URL}/contributions`, data);
}

export function addSpecialMember(id, member_id) {
    return axios.post(`${API_URL}/contributions/${id}/add-special-member`, {
        member_id,
    });
}

export function removeSpecialMember(id, member_id) {
    return axios.post(`${API_URL}/contributions/${id}/remove-special-member`, {
        member_id,
    });
}

export function deleteContribution(id) {
    return axios.delete(`${API_URL}/contributions/${id}`);
}

// Mmberships management

export function getMembershipsByContribution(id) {
    return axios.get(`${API_URL}/contributions/${id}/membership-requests`);
}

export function addMembership(id, data) {
    return axios.post(
        `${API_URL}/contributions/${id}/membership-requests`,
        data
    );
}

export function retrieveMembership(id) {
    return axios.get(`${API_URL}//membership-requests/${id}`);
}

export function updateMembership(id, data) {
    return axios.put(`${API_URL}/membership-requests/${id}`, data);
}

export function deleteMembership(id) {
    return axios.delete(`${API_URL}/membership-requests/${id}`);
}

export function getMembershipByUserAndContribution(contributionId) {
    return axios.get(
        `${API_URL}/membership-requests/contributions/${contributionId}`
    );
}

export function acceptMembership(id) {
    return axios.put(`${API_URL}/membership-requests/${id}/accept`);
}

export function rejectAllMembership(id) {
    return axios.put(
        `${API_URL}/contributions/${id}/reject-all-membership-requests`
    );
}

export function acceptAllMembership(id) {
    return axios.put(
        `${API_URL}/contributions/${id}/accept-all-membership-requests`
    );
}

export function fetchNextSession(id) {
    return axios.get(`${API_URL}/contributions/${id}/next-session`);
}

export function mesombPayment(data) {
    return axios.post(`${API_URL}/init-messonb-payments`, data);
}

export function initPaypalPayment(data) {
    return axios.post(`${API_URL}/paypal-payment`, data);
}

export function getUsdVal() {
    return axios.get(`${API_URL}/xaf-usd-val`);
}

export function allMyPayments() {
    return axios.get(`${API_URL}/all-my-payments`);
}
