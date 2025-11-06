import { useState, useEffect } from "react";
import { validateAccountForm } from "../utils/Validation";

function EditAccountForm({ account, onClose, onSave }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        status: "active",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serviceError, setServiceError] = useState(null);

    // Điền dữ liệu account khi component mount
    useEffect(() => {
        if (account) {
            setForm({
                username: account.username,
                email: account.email,
                password: account.password,
                confirmPassword: account.password,
                role: account.role,
                status: account.status,
            });
        }
    }, [account]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "status") {
            setForm({ ...form, status: checked ? "active" : "inactive" });
        } else {
            setForm({ ...form, [name]: value });
        }

        setErrors({ ...errors, [name]: "" });
        setServiceError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setServiceError(null);

        // 1. Validate form
        const validationErrors = validateAccountForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        // 2. Tách dữ liệu form
        const accountData = {
            username: form.username,
            email: form.email,
            password: form.password,
            role: form.role,
            status: form.status,
        };

        // 3. Gọi onSave (sẽ gọi service)
        onSave(account.id, accountData) // Gửi ID và dữ liệu mới
            .then(() => {
                // Thành công, component cha sẽ đóng form
            })
            .catch((err) => {
                // Hiển thị lỗi từ service (ví dụ: "Email đã tồn tại")
                setServiceError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[550px] p-6 animate-fadeIn">
                <h2 className="text-xl font-semibold mb-2">Edit Account</h2>
                <p className="text-gray-500 mb-4 text-sm">Update user account information</p>

                {/* HIỂN THỊ LỖI TỪ SERVICE */}
                {serviceError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
                        {serviceError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className={`border rounded-md w-full p-2 focus:ring focus:ring-blue-200 ${errors.username ? "border-red-500" : "border-gray-200"
                                    }`}
                                placeholder="Enter username"
                                disabled={loading}
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className={`border rounded-md w-full p-2 focus:ring focus:ring-blue-200 ${errors.email ? "border-red-500" : "border-gray-200"
                                    }`}
                                placeholder="Enter email"
                                disabled={loading}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password (có thể để trống nếu không muốn thay đổi, nhưng validation hiện tại đang bắt buộc) */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className={`border rounded-md w-full p-2 focus:ring focus:ring-blue-200 ${errors.password ? "border-red-500" : "border-gray-200"
                                    }`}
                                placeholder="Enter new password"
                                disabled={loading}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className={`border rounded-md w-full p-2 focus:ring focus:ring-blue-200 ${errors.confirmPassword ? "border-red-500" : "border-gray-200"
                                    }`}
                                placeholder="Confirm new password"
                                disabled={loading}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className={`border rounded-md w-full p-2 focus:ring focus:ring-blue-200 cursor-pointer ${errors.role ? "border-red-500" : "border-gray-200"
                                    }`}
                                disabled={loading}
                            >
                                <option value="">Select role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                        </div>

                        {/* Account Status */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Account Status</label>
                            <div className="border border-gray-200 rounded-md w-full p-2 flex items-center justify-between">
                                <span className="text-gray-700 font-medium">Active Account</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="status"
                                        type="checkbox"
                                        checked={form.status === "active"}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                        disabled={loading}
                                    />
                                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none 
                                        rounded-full peer
                                        peer-checked:bg-[#3B82F6]
                                        transition-colors duration-300 ease-in-out
                                        after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                                        after:bg-white after:border-gray-300 after:border after:rounded-full
                                        after:h-5 after:w-5 after:transition-all
                                        peer-checked:after:translate-x-full peer-checked:after:border-white"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6 border-t border-gray-200 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors duration-200 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition-colors duration-200 shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Updating..." : "Update Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAccountForm;
