// src/pages/admin/AccountManagement.jsx
import { useState, useMemo, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrash,
    faPlus,
    faLessThan,
    faGreaterThan,
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { accountService } from "../../services/accountService";
import { useAuth } from "../../contexts/AuthContext";

import AccountForm from "../../components/common/AccountForm";
import EditAccountForm from "../../components/common/EditAccountForm";
import ConfirmModal from "../../components/ui/ConfirmModal";

function AccountManagement() {
    const { user: currentUser } = useAuth(); // Lấy user đang đăng nhập
    const [userList, setUserList] = useState([]); // Đây là danh sách gốc từ service
    const [loading, setLoading] = useState(true); // Thêm state loading cho table

    // States Filter & Search
    const [search, setSearch] = useLocalStorage("account_search", "");
    const [roleFilter, setRoleFilter] = useLocalStorage("account_role_filter", "All");
    const [statusFilter, setStatusFilter] = useLocalStorage("account_status_filter", "All");
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // Modal States (form)
    const [showForm, setShowForm] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    // Modal States (delete)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const accounts = await accountService.getAll();
            setUserList(accounts);
        } catch (err) {
            toast.error("Lỗi khi tải danh sách tài khoản.");
        } finally {
            setLoading(false);
        }
    };

    // Khởi tạo dữ liệu từ service
    useEffect(() => {
        fetchAccounts();
    }, []);

    // Chuẩn hóa dữ liệu để hiển thị ra bảng
    const users = useMemo(() => {
        // Tạo bản sao và Sắp xếp (sort) theo ngày tạo
        // (b.createdAt - a.createdAt) = Mới nhất lên đầu
        const sortedList = [...userList].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // 2. Map (tạo list) từ danh sách đã sắp xếp
        return sortedList.map((acc) => ({
            id: acc.id,
            name: acc.username,
            email: acc.email,
            role: acc.role.charAt(0).toUpperCase() + acc.role.slice(1),
            status: acc.status.charAt(0).toUpperCase() + acc.status.slice(1),
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
            const matchesSearch =
                !searchLower ||
                u.name.toLowerCase().includes(searchLower) ||
                u.email.toLowerCase().includes(searchLower);

            // Sửa: Lọc theo giá trị đã chuẩn hóa (chữ hoa)
            const matchesRole = roleFilter === "All" || u.role === roleFilter;
            const matchesStatus = statusFilter === "All" || u.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, search, roleFilter, statusFilter]);

    // Phân trang 
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage); // Tính tống số trang
    const startIndex = (currentPage - 1) * itemsPerPage; // Tính vị trí bắt đầu của trang hiện tại
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage); // Lấy dữ liệu hien thị trong trang hien tai

    const handleAddAccount = async (accountData) => {
        try {
            await accountService.create(accountData);

            setShowForm(false);
            toast.success("Thêm account thành công!");
            await fetchAccounts();
            setCurrentPage(1);
        } catch (err) {
            throw err;
        }
    };

    const handleUpdateAccount = async (id, accountData) => {
        try {
            await accountService.update(id, accountData);

            setEditingAccount(null);
            toast.success("Cập nhật account thành công!");
            await fetchAccounts();
        } catch (err) {
            throw err;
        }
    };

    const confirmDeleteAccount = (account) => {
        setAccountToDelete(account);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteAccount = async () => {
        if (!accountToDelete) return;

        try {
            await accountService.delete(accountToDelete.id, currentUser.id);
            toast.success("Xóa account thành công!");
            await fetchAccounts();
        } catch (err) {
            toast.error(err.message);
        } finally {
            // Đóng modal và reset
            setIsDeleteModalOpen(false);
            setAccountToDelete(null);
        }
    };

    return (
        <div className="p-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Account Management
                </h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg 
                        hover:bg-blue-700 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm
                       w-full md:w-auto"
                >
                    <FontAwesomeIcon icon={faPlus} /> Add Account
                </button>
            </div>

            {/* Search & Filters (Sửa value của Filter) */}
            <div className="bg-white shadow-sm rounded-xl p-4 mb-6 
                        flex flex-col md:flex-row md:flex-wrap gap-3 md:items-center">
                <div className="relative w-full md:flex-grow-0 md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search accounts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer 
                     hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200 w-full md:w-auto"
                >
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer 
                     hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200 w-full md:w-auto"
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* User Table (Thêm xử lý loading) */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-40 text-gray-600 text-sm">
                        <tr>
                            <th className="text-left p-3">ID</th>
                            <th className="text-left p-3">User</th>
                            <th className="text-left p-3">Role</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Created At</th>
                            <th className="text-center p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center p-6 text-gray-500">
                                    Loading accounts...
                                </td>
                            </tr>
                        ) : currentUsers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-6 text-gray-500">
                                    No accounts found.
                                </td>
                            </tr>
                        ) : (
                            currentUsers.map((user) => (
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
                                        <button
                                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                                            onClick={() => setEditingAccount(user)}
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
                                            onClick={() => confirmDeleteAccount(user)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination (Chỉ hiển thị nếu có dữ liệu và không loading) */}
                {!loading && totalPages > 1 && (
                    <div className="p-4 text-gray-500 text-sm border-t border-gray-300 bg-gray-50 
                                  flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
                        <span className="text-center sm:text-left">
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
                )}
            </div>

            {
                showForm && (
                    <AccountForm
                        onClose={() => setShowForm(false)}
                        onSave={handleAddAccount}
                    />
                )
            }
            {
                editingAccount && (
                    <EditAccountForm
                        account={editingAccount}
                        onClose={() => setEditingAccount(null)}
                        onSave={handleUpdateAccount}
                    />
                )
            }
            {isDeleteModalOpen && (
                <ConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteAccount}
                    title="Delete Account"
                    // Lúc này accountToDelete chắc chắn đã có dữ liệu
                    message={`Bạn có chắc chắn muốn xóa tài khoản "${accountToDelete?.name}"? Hành động này không thể hoàn tác.`}
                    confirmText="Delete"
                    confirmColor="bg-red-600"
                />
            )}
        </div >
    );
}

export default AccountManagement;