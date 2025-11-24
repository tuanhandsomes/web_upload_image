import axios from "axios";

const client = axios.create({
    baseURL: 'https://my-app-backend-efhe.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    // (Tùy chọn) Timeout sau 10 giây nếu mạng quá lag
    timeout: 10000,
});

const sendRequest = async (endpoint, method = 'GET', body = null) => {
    try {
        const response = await client({
            url: endpoint,
            method: method,
            data: body, // Axios dùng property 'data' thay vì 'body'
        });

        // Axios tự động parse JSON, dữ liệu nằm trong response.data
        return response.data;

    } catch (error) {
        if (error.response) {
            // Server trả về lỗi (404, 500...)
            console.error("API Error Response:", error.response.data);
            throw new Error(error.response.data.message || `Lỗi ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
            // Không nhận được phản hồi (mất mạng, server sập)
            console.error("API No Response:", error.request);
            throw new Error("Không thể kết nối đến Server. Vui lòng kiểm tra mạng.");
        } else {
            // Lỗi khi setup request
            console.error("API Setup Error:", error.message);
            throw error;
        }
    }
};

export const api = {
    get: (endpoint) => sendRequest(endpoint, 'GET'),
    post: (endpoint, body) => sendRequest(endpoint, 'POST', body),
    put: (endpoint, body) => sendRequest(endpoint, 'PUT', body),
    delete: (endpoint) => sendRequest(endpoint, 'DELETE'),
};
