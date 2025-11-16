// src/components/layout/Header.jsx
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";

// Nhận prop onMenuToggle
function Header({ onMenuToggle }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        if (user?.role === 'admin') {
            navigate('/admin/login');
        } else {
            navigate('/login');
        }
    };

    return (
        <header className="bg-[#223771] text-white p-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-4">
                {/* Nút Hamburger (chỉ hiện trên di động) */}
                <button
                    onClick={onMenuToggle}
                    className="text-white text-xl lg:hidden" // Ẩn trên desktop (lg:hidden)
                    aria-label="Toggle menu"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            <div className="flex items-center gap-4">
                {user && <span className="text-sm text-blue-200 sm:block"><FontAwesomeIcon icon={faUser} /> {user.username}</span>}
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm cursor-pointer"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="text-blue-300 hover:underline">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}
export default Header;