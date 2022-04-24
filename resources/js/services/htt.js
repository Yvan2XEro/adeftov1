const API = "http://127.0.0.1:8000";

export const API_URL = API + "/api";

export function imagePath(fileName) {
    return `${API}/${fileName}`;
}

export const defaultImage =
    "https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873__340.png";
