import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Header() {
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
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
            <Link
                to={user?.role === "admin" ? "/admin/dashboard" : "/"}
                className="text-lg font-semibold"
            >
                ImageManager
            </Link>

            <div className="flex items-center gap-4">
                {user && <span className="text-sm"><FontAwesomeIcon icon={faUser} className="text-white-500 text-lg" /> {user.username}</span>}
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