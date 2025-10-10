function validateCredentials(username, password) {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/; // không dấu, không space
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) return "Vui lòng nhập tên đăng nhập hoặc email.";
    if (!(usernameRegex.test(username) || emailRegex.test(username)))
        return "Tên đăng nhập hoặc email không hợp lệ.";
    if (!password) return "Vui lòng nhập mật khẩu.";
    if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";

    return null;
};

export default validateCredentials;

// Kiểm tra form thêm account
export function validateAccountForm({ username, email, password, confirmPassword, role }) {
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};

    // Username
    if (!username?.trim()) {
        errors.username = "Tên đăng nhập không được để trống";
    } else if (!usernameRegex.test(username)) {
        errors.username = "Username phải từ 3-20 ký tự, không dấu, không cách";
    }

    // Email
    if (!email?.trim()) {
        errors.email = "Email không được để trống";
    } else if (!emailRegex.test(email)) {
        errors.email = "Email không hợp lệ";
    }

    // Password
    if (!password) {
        errors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
        errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Confirm password
    if (password !== confirmPassword) {
        errors.confirmPassword = "Mật khẩu nhập lại không khớp!";
    }

    // Role
    if (!role?.trim()) {
        errors.role = "Vui lòng chọn role";
    } else if (!["Admin", "User"].includes(role)) {
        errors.role = "Role không hợp lệ";
    }

    return errors;
}

// Kiểm tra trùng username/email
export function checkDuplicate(storedAccounts, { username, email }) {
    if (storedAccounts.some(acc => acc.username.toLowerCase() === username.toLowerCase())) {
        return "Username đã tồn tại";
    }
    if (storedAccounts.some(acc => acc.email.toLowerCase() === email.toLowerCase())) {
        return "Email đã tồn tại";
    }
    return null; // không lỗi
}