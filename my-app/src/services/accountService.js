// src/services/accountService.js
import accountsData from "../mockData/accounts.json";
import { getData, saveData } from "../utils/storage";

const STORAGE_KEY = "accounts";

const initAccounts = () => {
    const stored = getData(STORAGE_KEY);
    if (!stored || stored.length === 0) {
        saveData(STORAGE_KEY, accountsData.accounts);
        return accountsData.accounts;
    }
    return stored;
};
initAccounts();

export const accountService = {
    // Lấy tất cả tài khoản
    getAll: () => {
        const stored = getData(STORAGE_KEY, []);
        return Promise.resolve(stored);
    },

    // Lấy tài khoản theo ID
    getById: (id) => {
        const accounts = getData(STORAGE_KEY, []);
        const account = accounts.find((a) => a.id === id);
        return Promise.resolve(account);
    },

    create: (accountData) => {
        const accounts = getData(STORAGE_KEY, []);

        // 1. Kiểm tra trùng lặp
        const usernameExists = accounts.some(
            (acc) => acc.username.toLowerCase() === accountData.username.toLowerCase()
        );
        if (usernameExists) {
            return Promise.reject(new Error("Username đã tồn tại"));
        }

        const emailExists = accounts.some(
            (acc) => acc.email.toLowerCase() === accountData.email.toLowerCase()
        );
        if (emailExists) {
            return Promise.reject(new Error("Email đã tồn tại"));
        }

        // 2. Tạo ID mới
        const newId = accounts.length > 0 ? Math.max(...accounts.map((a) => a.id)) + 1 : 1;

        // 3. Tạo object account mới (chuẩn hóa dữ liệu)
        const newAccount = {
            id: newId,
            username: accountData.username.trim(),
            email: accountData.email.trim(),
            password: accountData.password,
            role: accountData.role,
            status: accountData.status,
            createdAt: new Date().toISOString(),
        };

        // 4. Lưu vào localStorage
        const updatedList = [...accounts, newAccount];
        saveData(STORAGE_KEY, updatedList);

        return Promise.resolve(newAccount);
    },

    update: (id, accountData) => {
        const accounts = getData(STORAGE_KEY, []);
        const index = accounts.findIndex((a) => a.id === id);

        if (index === -1) {
            return Promise.reject(new Error("Account not found"));
        }

        // 1. Kiểm tra trùng lặp (bỏ qua chính mình)
        const usernameExists = accounts.some(
            (acc) =>
                acc.username.toLowerCase() === accountData.username.toLowerCase() &&
                acc.id !== id
        );
        if (usernameExists) {
            return Promise.reject(new Error("Username đã tồn tại"));
        }

        const emailExists = accounts.some(
            (acc) =>
                acc.email.toLowerCase() === accountData.email.toLowerCase() &&
                acc.id !== id
        );
        if (emailExists) {
            return Promise.reject(new Error("Email đã tồn tại"));
        }

        // 2. Cập nhật dữ liệu
        const updatedAccount = {
            ...accounts[index],
            username: accountData.username.trim(),
            email: accountData.email.trim(),
            password: accountData.password,
            role: accountData.role,
            status: accountData.status,
        };

        accounts[index] = updatedAccount;
        saveData(STORAGE_KEY, accounts);

        return Promise.resolve(updatedAccount);
    },

    delete: (idToDelete, currentUserId) => {
        if (idToDelete === currentUserId) {
            return Promise.reject(new Error("Bạn không thể xoá tài khoản đang đăng nhập!"));
        }

        const accounts = getData(STORAGE_KEY, []);
        const updatedList = accounts.filter((a) => a.id !== idToDelete);

        if (accounts.length === updatedList.length) {
            return Promise.reject(new Error("Account not found"));
        }

        saveData(STORAGE_KEY, updatedList);
        return Promise.resolve();
    },
};