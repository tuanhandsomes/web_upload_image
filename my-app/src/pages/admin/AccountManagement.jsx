import { useState, useMemo, useEffect } from "react";
import { accounts as mockAccounts } from "../../mockData/accounts";
import { getData, saveData } from "../../utils/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrash,
    faPlus,
    faLessThan,
    faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
import AccountForm from "../../components/AccountForm";
import EditAccountForm from "../../components/EditAccountForm";
import Alert from "../../components/ui/Alert";

function AccountManagement() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingAccount, setEditingAccount] = useState(null);
    const [alert, setAlert] = useState(null);
    const itemsPerPage = 5;

    // Hàm show alert
    const showAlert = (message, type = "success") => {
        setAlert({ message, type });
    };


    // Khởi tạo dữ liệu từ LocalStorage hoặc mock data
    useEffect(() => {
        const stored = getData("accounts");
        if (!stored || stored.length === 0) {
            saveData("accounts", mockAccounts);
            setUserList(mockAccounts);
        } else {
            setUserList(stored);
        }
    }, []);

    // Khi userList thay đổi => lưu lại LocalStorage
    useEffect(() => {
        if (userList.length > 0) {
            saveData("accounts", userList);
        }
    }, [userList]);

    // Chuẩn hóa dữ liệu để hiển thị ra bảng
    const users = useMemo(() => {
        return userList.map((acc) => ({
            id: acc.id,
            name: acc.username,
            email: acc.email,
            role: acc.role.toLowerCase() === "admin" ? "Admin" : "User",
            status: acc.status.toLowerCase() === "active" ? "Active" : "Inactive",
            created: new Date(acc.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        }));
    }, [userList]);

    // Lọc theo từ khóa, vai trò, trạng thái
    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const searchLower = search.trim().toLowerCase();
            const matchesSearch = !searchLower ||
                u.name.toLowerCase().includes(searchLower) ||
                u.email.toLowerCase().includes(searchLower);
            const matchesRole = roleFilter === "All" || u.role === roleFilter;
            const matchesStatus = statusFilter === "All" || u.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, search, roleFilter, statusFilter]);

    // Lấy tổng số user sau khi lọc chia cho số trang và làm tròn lên
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    // Tính vị trí bắt đầu của trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    // Cắt danh sách để chỉ lấy user của trang đó
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handleAddAccount = (newAcc) => {
        setUserList((prev) => {
            const maxId = prev.length > 0 ? Math.max(...prev.map((a) => a.id)) : 0;
            const newAccount = { ...newAcc, id: maxId + 1 };
            const updated = [...prev, newAccount];
            saveData("accounts", updated);
            return updated;
        });
        setShowForm(false);
        setCurrentPage(1);
        showAlert("Thêm account thành công!", "success");
    };

    const handleUpdateAccount = (updatedAcc) => {
        setUserList((prev) => {
            const newList = prev.map((acc) => (acc.id === updatedAcc.id ? updatedAcc : acc));
            saveData("accounts", newList);
            return newList;
        });
        setEditingAccount(null);
        showAlert("Cập nhật account thành công!", "success");
    };

    const handleDeleteAccount = (account) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        if (currentUser && account.id === currentUser.id) {
            alert("Bạn không thể xoá tài khoản đang đăng nhập!");
            return;
        }

        const confirmed = window.confirm(
            `Bạn có chắc muốn xoá tài khoản "${account.username}" không?`
        );
        if (!confirmed) return;

        const updatedList = userList.filter(acc => acc.id !== account.id);
        setUserList(updatedList);
        saveData("accounts", updatedList);
        showAlert("Xoá account thành công!", "success");
    };


    return (
        <div className="p-6 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Account Management
                </h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg 
                    hover:bg-blue-700 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
                >
                    <FontAwesomeIcon icon={faPlus} /> Add Account
                </button>
            </div>

            {/* Search & Filters */}
            <div className="bg-white shadow-sm rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
                <input
                    type="text"
                    placeholder="Search accounts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer 
                    hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer 
                    hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* User Table */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-40 text-gray-600 text-sm">
                        <tr>
                            <th className="text-left p-3">ID</th>
                            <th className="text-left p-3">User</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Role</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Created At</th>
                            <th className="text-center p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                            >
                                <td className="p-3 text-gray-700 font-medium">{user.id}</td>
                                <td className="p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-semibold">
                                        {user.name[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{user.name}</p>
                                        <p className="text-gray-500 text-sm">{user.email}</p>
                                    </div>
                                </td>
                                <td className="p-3 text-gray-700">{user.email}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full ${user.role === "Admin"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full ${user.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3 text-gray-700">{user.created}</td>
                                <td className="p-3 text-center flex justify-center gap-3">
                                    <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                                        onClick={() => {
                                            // Lấy account gốc từ userList
                                            const accToEdit = userList.find((a) => a.id === user.id);
                                            setEditingAccount(accToEdit); // mở modal sửa
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
                                        onClick={() => handleDeleteAccount(userList.find((a) => a.id === user.id))}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="p-4 text-gray-500 text-sm border-t border-gray-300 bg-gray-50 flex justify-between items-center">
                    <span>
                        Showing {startIndex + 1} to{" "}
                        {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                        {filteredUsers.length} results
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className={`py-1 px-2 border border-gray-300 rounded-lg bg-white transition-all duration-200 
                            ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 active:scale-95"}`}
                        >
                            <FontAwesomeIcon icon={faLessThan} />
                        </button>

                        {(() => {
                            const pages = [];
                            const totalToShow = 3; // Số trang tối đa hiển thị trong phân trang
                            let startPage = Math.max(1, currentPage - 1); // Bắt đầu từ trang trước đó
                            let endPage = Math.min(totalPages, startPage + totalToShow - 1); // Kết thúc sau 3 trang

                            if (currentPage === 1) {
                                startPage = 1;
                                endPage = Math.min(totalPages, 3);
                            }
                            if (currentPage === totalPages && totalPages > 3) {
                                startPage = totalPages - 2;
                                endPage = totalPages;
                            }

                            if (startPage > 1)
                                pages.push(<span key="dots-prev" className="px-2 text-gray-400">...</span>);

                            for (let i = startPage; i <= endPage; i++) {
                                pages.push(
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`px-3 py-1 border border-gray-300 rounded-lg transition-all duration-200 ${currentPage === i
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-white hover:bg-gray-100 active:scale-95"
                                            }`}
                                    >
                                        {i}
                                    </button>
                                );
                            }

                            if (endPage < totalPages)
                                pages.push(<span key="dots-next" className="px-2 text-gray-400">...</span>);

                            return pages;
                        })()}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`py-1 px-2 border border-gray-300 rounded-lg bg-white transition-all duration-200 
                            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 active:scale-95"}`}
                        >
                            <FontAwesomeIcon icon={faGreaterThan} />
                        </button>
                    </div>
                </div>
            </div>

            {showForm && (
                <AccountForm onClose={() => setShowForm(false)} onSave={handleAddAccount} />
            )}
            {editingAccount && (
                <EditAccountForm
                    account={editingAccount}
                    onClose={() => setEditingAccount(null)}
                    onSave={handleUpdateAccount}
                />
            )}
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}
        </div>
    );
}

export default AccountManagement;

