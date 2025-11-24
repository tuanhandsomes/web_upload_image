// src/services/accountService.js
import { api } from "../utils/request";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const accountService = {
    // Lấy tất cả tài khoản
    getAll: async () => {
        return await api.get('/accounts');
    },

    // Lấy tài khoản theo ID
    getById: async (id) => {
        try {
            return await api.get(`/accounts/${id}`);
        } catch (error) {
            throw new Error('Account not found');
        }
    },

    // Tạo tài khoản mới
    create: async (accountData) => {
        // 1. Kiểm tra trùng lặp (Lấy tất cả về check)
        const allAccounts = await api.get('/accounts');

        if (allAccounts.some(a => a.username.toLowerCase() === accountData.username.toLowerCase())) {
            throw new Error("Username đã tồn tại");
        }
        if (allAccounts.some(a => a.email.toLowerCase() === accountData.email.toLowerCase())) {
            throw new Error("Email đã tồn tại");
        }

        // 2. Mã hóa mật khẩu
        const hashedPassword = bcrypt.hashSync(accountData.password, SALT_ROUNDS);

        // 3. Tạo object account mới
        const newAccount = {
            id: String(Date.now()), // ID dạng chuỗi
            username: accountData.username.trim(),
            email: accountData.email.trim(),
            password: hashedPassword,
            role: accountData.role,
            status: accountData.status,
            createdAt: new Date().toISOString(),
        };

        // 4. Gọi POST /accounts
        return await api.post('/accounts', newAccount);
    },

    // Cập nhật tài khoản
    update: async (id, accountData) => {
        // 1. Lấy thông tin cũ
        const currentAccount = await accountService.getById(id);

        // 2. Logic bảo vệ: Không cho phép vô hiệu hóa (inactive) tài khoản Admin
        if (currentAccount.role === 'admin' && accountData.status === 'inactive') {
            throw new Error("Bạn không thể vô hiệu hóa tài khoản Admin!");
        }

        // 3. Kiểm tra trùng lặp (trừ chính nó)
        const allAccounts = await api.get('/accounts');

        const usernameExists = allAccounts.some(
            (acc) =>
                acc.username.toLowerCase() === accountData.username.toLowerCase() &&
                String(acc.id) !== String(id)
        );
        if (usernameExists) throw new Error("Username đã tồn tại");

        const emailExists = allAccounts.some(
            (acc) =>
                acc.email.toLowerCase() === accountData.email.toLowerCase() &&
                String(acc.id) !== String(id)
        );
        if (emailExists) throw new Error("Email đã tồn tại");

        // 4. Xử lý Mật khẩu (Mã hóa nếu có thay đổi)
        let passwordToSave = currentAccount.password;

        if (accountData.password && accountData.password !== currentAccount.password) {
            passwordToSave = bcrypt.hashSync(accountData.password, SALT_ROUNDS);
        }

        // 5. Merge dữ liệu
        const updatedAccount = {
            ...currentAccount,
            ...accountData,
            username: accountData.username.trim(),
            email: accountData.email.trim(),
            password: passwordToSave,
        };

        // 6. Gọi PUT /accounts/:id
        return await api.put(`/accounts/${id}`, updatedAccount);
    },

    // Xóa tài khoản
    delete: async (idToDelete, currentUserId) => {
        // 1. Kiểm tra: Không được tự xóa chính mình
        if (String(idToDelete) === String(currentUserId)) {
            throw new Error("Bạn không thể xoá tài khoản đang đăng nhập!");
        }

        // 2. Gọi DELETE /accounts/:id
        return await api.delete(`/accounts/${idToDelete}`);
    },
};