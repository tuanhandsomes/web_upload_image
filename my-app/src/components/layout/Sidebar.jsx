// src/components/layout/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faImages, faFolderOpen, faChartPie, faCloudArrowUp, faHouse, faDiagramProject, faCameraRetro } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isMobileMenuOpen, onMenuClose }) {
    const { user } = useAuth();
    const location = useLocation();

    const linkClass = (path) =>
        `flex items-center gap-3 flex-nowrap whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer
        ${location.pathname === path
            ? "bg-[#f8843d] text-white shadow-sm"
            : "text-blue-200 hover:opacity-75"
        }`;

    const handleLinkClick = () => {
        if (isMobileMenuOpen) {
            onMenuClose();
        }
    };

    return (
        <>
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={onMenuClose}
                ></div>
            )}

            <aside
                className={`
                    bg-[#223771] text-blue-100 w-64 min-h-full p-5 rounded-2xl flex flex-col 
                    transition-transform duration-300 ease-in-out z-30
                    
                    ${/* Mobile (Mặc định): Cố định, bo góc, và ẩn */ ''}
                    fixed inset-y-4 left-4
                    ${isMobileMenuOpen
                        ? 'translate-x-0' // Hiện (trên di động)
                        : '-translate-x-full' // Ẩn (trên di động)
                    }
                    
                    ${/* Desktop (lg:): Trở lại bình thường, là 1 phần của layout */ ''}
                    lg:static lg:inset-auto lg:translate-x-0 lg:rounded-2xl
                `}
            >

                {/* Logo / Title*/}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-wide text-white"><FontAwesomeIcon icon={faCameraRetro} />
                        <Link
                            to={user?.role === "admin" ? "/admin/dashboard" : "/project-selection"}
                        >
                            Image Upload
                        </Link></h2>
                    <div className="border-t border-blue-300/40 mt-2"></div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {user?.role === "admin" ? (
                        <>
                            <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")} onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faChartPie} /> Dashboard
                            </Link>
                            <Link to="/admin/projects" className={linkClass("/admin/projects")} onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faFolderOpen} /> Project Management
                            </Link>
                            <Link to="/admin/accounts" className={linkClass("/admin/accounts")} onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faUsers} /> Account Management
                            </Link>
                            <Link to="/admin/all-photos" className={linkClass("/admin/all-photos")} onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faImages} /> All Photos
                            </Link>
                        </>
                    ) : (
                        <>

                            <Link to="/project-selection" className={linkClass("/project-selection")} onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faDiagramProject} /> Project Selection
                            </Link>
                            <Link to="/image-upload" className={linkClass("/image-upload")} onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faCloudArrowUp} /> Upload Images
                            </Link>
                            <Link to="/gallery" className={linkClass("/gallery")} onClick={handleLinkClick}>
                                <FontAwesomeIcon icon={faImages} /> Gallery
                            </Link>
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
}
export default Sidebar;