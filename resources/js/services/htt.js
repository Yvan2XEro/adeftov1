const API = "http://127.0.0.1:8000";

export const API_URL = API + "/api";

export function imagePath(fileName) {
    return `${API}/${fileName}`;
}
