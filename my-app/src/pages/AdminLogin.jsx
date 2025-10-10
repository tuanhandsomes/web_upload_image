import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { accountService } from "../services/accountService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import validateCredentials from "../utils/Validation";

function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        accountService.getAll();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validateCredentials(credentials.username, credentials.password);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const accounts = await accountService.getAll();

            const admin = accounts.find(
                (a) =>
                    (a.username.toLowerCase() === credentials.username.toLowerCase() ||
                        a.email.toLowerCase() === credentials.username.toLowerCase()) &&
                    a.password === credentials.password &&
                    a.role.toLowerCase() === "admin" &&
                    a.status.toLowerCase() === "active"
            );

            if (admin) {
                const normalizedAdmin = { ...admin, role: "admin" };
                login(normalizedAdmin);

                navigate("/admin/dashboard", { replace: true });
            } else {
                setError("Tên đăng nhập hoặc mật khẩu không đúng!");
            }
        } catch (err) {
            console.error("Admin login error:", err);
            setError("Đã xảy ra lỗi khi đăng nhập.");
        }
    };

    const handleUserLogin = () => {
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <div className="p-4">
                        <FontAwesomeIcon
                            icon={faShieldAlt}
                            className="h-14 w-14 text-purple-600 bg-purple-100 p-4 rounded-full border-purple-300 shadow-md"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mt-3">Admin Login</h2>
                    <p className="text-gray-500 text-sm">
                        Sign in as administrator to manage the system
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="text-red-500 text-center text-sm bg-red-100 py-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Username or Email
                        </label>
                        <input
                            type="text"
                            placeholder="Enter admin username or email"
                            value={credentials.username}
                            onChange={(e) =>
                                setCredentials({ ...credentials, username: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-purple-500" /> Remember me
                        </label>
                        <a href="#" className="text-purple-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                        Sign In
                    </button>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-400 text-sm">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button
                        type="button"
                        onClick={handleUserLogin}
                        className="w-full py-2 border border-purple-400 text-purple-500 rounded-lg hover:bg-purple-50 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faUser} className="text-purple-500 text-lg" />
                        User Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
