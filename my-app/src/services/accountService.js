import bcrypt from "bcryptjs";

const API_URL = 'https://my-app-backend-efhe.onrender.com/accounts';
const SALT_ROUNDS = 10;

export const accountService = {
    // Lấy tất cả tài khoản
    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch accounts');
        }
        return await response.json();
    },

    // Lấy tài khoản theo ID
    getById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Account not found');
        }
        return await response.json();
    },

    create: async (accountData) => {

        // 1. Kiểm tra trùng lặp (Query server)
        const allRes = await fetch(API_URL);
        const allAccounts = await allRes.json();

        if (allAccounts.some(a => a.username.toLowerCase() === accountData.username.toLowerCase())) {
            throw new Error("Username đã tồn tại");
        }
        if (allAccounts.some(a => a.email.toLowerCase() === accountData.email.toLowerCase())) {
            throw new Error("Email đã tồn tại");
        }

        // 2. Mã hóa mật khẩu
        const hashedPassword = bcrypt.hashSync(accountData.password, SALT_ROUNDS);

        // 3. Tạo object account mới (chuẩn hóa dữ liệu)
        const newAccount = {
            id: String(Date.now()), // Giả định ID là timestamp
            username: accountData.username.trim(),
            email: accountData.email.trim(),
            password: hashedPassword,
            role: accountData.role,
            status: accountData.status,
            createdAt: new Date().toISOString(),
        };

        // 4. Gửi lên server
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount)
        });
        // Kiểm tra phản hồi
        if (!response.ok) {
            throw new Error('Failed to create account');
        }
        return await response.json();
    },

    update: async (id, accountData) => {
        // 1. Lấy thông tin account hiện tại từ Server
        const currentRes = await fetch(`${API_URL}/${id}`);
        if (!currentRes.ok) {
            throw new Error('Account not found');
        }
        const currentAccount = await currentRes.json();

        // 2. Logic bảo vệ: Không cho phép vô hiệu hóa (inactive) tài khoản Admin đang đăng nhập
        if (currentAccount.role === 'admin' && accountData.status === 'inactive') {
            throw new Error("Bạn không thể vô hiệu hóa tài khoản Admin!");
        }
        // 3. Kiểm tra trùng lặp username/email
        // Lấy tất cả account về để check (trừ chính nó)
        const allRes = await fetch(API_URL);
        const allAccounts = await allRes.json();
        const usernameExists = allAccounts.some(
            (acc) =>
                acc.username.toLowerCase() === accountData.username.toLowerCase() &&
                String(acc.id) !== String(id) // So sánh ID dạng chuỗi
        );
        if (usernameExists) {
            return Promise.reject(new Error("Username đã tồn tại"));
        }

        const emailExists = allAccounts.some(
            (acc) =>
                acc.email.toLowerCase() === accountData.email.toLowerCase() &&
                String(acc.id) !== String(id) // So sánh ID dạng chuỗi
        );
        if (emailExists) {
            return Promise.reject(new Error("Email đã tồn tại"));
        }

        // 4. Xử lý Mật khẩu (Mã hóa nếu có thay đổi)
        let passwordToSave = currentAccount.password; // Giữ mật khẩu cũ (đã hash)
        if (accountData.password && accountData.password !== currentAccount.password) {
            // Mã hoá mật khẩu mới
            passwordToSave = bcrypt.hashSync(accountData.password, SALT_ROUNDS);
        }
        // 5. Cập nhật dữ liệu
        const updatedAccount = {
            ...currentAccount, // Giữ lại thông tin cũ (id, createdAt...)
            ...accountData,    // Ghi đè thông tin mới
            username: accountData.username.trim(),
            email: accountData.email.trim(),
            password: passwordToSave, // Lưu mật khẩu đã xử lý
        };

        // 6. Gửi lệnh PUT lên Server
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedAccount)
        });

        if (!response.ok) throw new Error('Failed to update account');
        return await response.json();
    },

    delete: async (idToDelete, currentUserId) => {
        // 1. Kiểm tra: Không được tự xóa chính mình
        // (Chuyển sang String để so sánh an toàn vì ID json-server thường là string)
        if (String(idToDelete) === String(currentUserId)) {
            throw new Error("Bạn không thể xoá tài khoản đang đăng nhập!");
        }

        // 2. Gửi lệnh DELETE lên Server
        const response = await fetch(`${API_URL}/${idToDelete}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            // Nếu server trả về lỗi (ví dụ 404 Not Found)
            throw new Error('Account not found or already deleted');
        }

        return await response.json();
    },
};
