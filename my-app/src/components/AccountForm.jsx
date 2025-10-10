import { useState } from "react";
import { validateAccountForm, checkDuplicate } from "../utils/Validation";

function AccountForm({ onClose, onSave }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        isActive: true,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
        setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi user nhập vào input
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const validationErrors = validateAccountForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Lấy danh sách account hiện có
        const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

        // Check trùng
        const duplicateError = checkDuplicate(storedAccounts, form);
        if (duplicateError) {
            alert(duplicateError);
            return;
        }

        // Tạo ID mới
        const newId =
            storedAccounts.length > 0
                ? Math.max(...storedAccounts.map((acc) => acc.id)) + 1
                : 1;

        // Tạo account mới
        const newAccount = {
            id: newId,
            username: form.username.trim(),
            email: form.email.trim(),
            password: form.password,
            role: form.role,
            status: form.isActive ? "active" : "inactive",
            createdAt: new Date().toISOString(),
        };

        // Lưu vào LocalStorage
        const updatedAccounts = [...storedAccounts, newAccount];
        localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

        // Gọi callback
        onSave(newAccount);

        // Reset form
        setForm({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
            isActive: true,
        });
        setErrors({});
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[550px] p-6 animate-fadeIn">
                <h2 className="text-xl font-semibold mb-2">Add New Account</h2>
                <p className="text-gray-500 mb-4 text-sm">
                    Add a new user account to the system
                </p>

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
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
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
                                placeholder="Enter password"
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
                                placeholder="Confirm password"
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
                            >
                                <option value="">Select role</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                        </div>

                        {/* Account Status */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Account Status
                            </label>
                            <div className="border border-gray-200 rounded-md w-full p-2 flex items-center justify-between">
                                <span className="text-gray-700 font-medium">Active Account</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        name="isActive"
                                        type="checkbox"
                                        checked={form.isActive}
                                        onChange={handleChange}
                                        className="sr-only peer"
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
                            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition-colors duration-200 shadow-md active:scale-95"
                        >
                            Add Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountForm;
