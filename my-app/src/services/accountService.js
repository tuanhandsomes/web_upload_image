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

let accounts = initAccounts();

export const accountService = {
    // Lấy tất cả tài khoản
    getAll: () => {
        const stored = getData(STORAGE_KEY);
        accounts = stored.length ? stored : accounts;
        return Promise.resolve(accounts);
    },

    // Lấy tài khoản theo ID
    getById: (id) => {
        const stored = getData(STORAGE_KEY);
        const account = stored.find((a) => a.id === id);
        return Promise.resolve(account);
    },

    // Tạo tài khoản mới
    create: (accountData) => {
        const stored = getData(STORAGE_KEY, []);
        const newId =
            stored.length > 0 ? Math.max(...stored.map((a) => a.id)) + 1 : 1;

        const newAccount = {
            id: newId,
            ...accountData,
            createdAt: new Date().toISOString(),
        };

        const updatedList = [...stored, newAccount];
        saveData(STORAGE_KEY, updatedList);
        accounts = updatedList;

        return Promise.resolve(newAccount);
    },

    // Cập nhật tài khoản
    update: (id, accountData) => {
        const stored = getData(STORAGE_KEY, []);
        const index = stored.findIndex((a) => a.id === id);
        if (index !== -1) {
            stored[index] = { ...stored[index], ...accountData };
            saveData(STORAGE_KEY, stored);
            accounts = stored;
            return Promise.resolve(stored[index]);
        }
        return Promise.reject("Account not found");
    },

    // Xóa tài khoản
    delete: (id) => {
        const stored = getData(STORAGE_KEY, []);
        const updatedList = stored.filter((a) => a.id !== id);
        saveData(STORAGE_KEY, updatedList);
        accounts = updatedList;
        return Promise.resolve();
    },
};
