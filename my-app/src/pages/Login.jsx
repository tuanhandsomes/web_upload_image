import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { accountService } from "../services/accountService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import validateCredentials from "../utils/Validation";

function Login() {
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

        const validationError = validateCredentials(
            credentials.username,
            credentials.password
        );
        if (validationError) {
            setError(validationError);
            return;
        }

        try {

            const accounts = await accountService.getAll();

            const user = accounts.find(
                (a) =>
                    (a.username.toLowerCase() === credentials.username.toLowerCase() ||
                        a.email.toLowerCase() === credentials.username.toLowerCase()) &&
                    a.password === credentials.password &&
                    a.role.toLowerCase() === "user" &&
                    a.status.toLowerCase() === "active"
            );

            if (user) {
                login(user);
                navigate("/");
            } else {
                setError("Tên đăng nhập hoặc mật khẩu không đúng!");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Đã xảy ra lỗi khi đăng nhập.");
        }
    };

    const handleAdminLogin = () => {
        navigate("/admin/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md ">
                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-100 p-4 rounded-xl shadow-md flex items-center justify-center w-14 h-14">
                        <FontAwesomeIcon icon={faImages} className="text-blue-600 text-3xl " />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-3">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">
                        Sign in to your account to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="text-red-500 text-center text-sm bg-red-100 py-2 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email or Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your email or username"
                            value={credentials.username}
                            onChange={(e) =>
                                setCredentials({ ...credentials, username: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-blue-500" /> Remember me
                        </label>
                        <a href="#" className="text-blue-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer flex items-center justify-center gap-2"
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
                        onClick={handleAdminLogin}
                        className="w-full py-2 border border-blue-400 text-blue-500 rounded-lg hover:bg-blue-50 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <span>Admin Login</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
