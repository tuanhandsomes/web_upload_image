import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faImages, faFolderOpen, faChartPie, faCloudArrowUp, faHouse, faDiagramProject, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
function Sidebar() {
    const { user } = useAuth();
    const location = useLocation();

    const linkClass = (path) =>
        `flex items-center gap-3 flex-nowrap whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer
        ${location.pathname === path
            ? "bg-[#3B82F6] text-white shadow-sm"
            : "text-gray-300 hover:bg-blue-500/20 hover:text-white"
        }`;

    return (
        <aside className="bg-gray-800 text-gray-100 w-64 min-h-screen p-5 shadow-lg flex flex-col ">
            {/* Logo / Title */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-wide"><FontAwesomeIcon icon={faCameraRetro} />
                    <Link
                        to={user?.role === "admin" ? "/admin/dashboard" : "/"}
                    >
                        Image Upload
                    </Link></h2>
                <div className="border-t border-indigo-200/40 mt-2"></div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                {user?.role === "admin" ? (
                    <>
                        <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
                            <FontAwesomeIcon icon={faChartPie} />
                            Dashboard
                        </Link>

                        <Link to="/admin/projects" className={linkClass("/admin/projects")}>
                            <FontAwesomeIcon icon={faFolderOpen} />
                            Project Management
                        </Link>

                        <Link to="/admin/accounts" className={linkClass("/admin/accounts")}>
                            <FontAwesomeIcon icon={faUsers} />
                            Account Management
                        </Link>

                        <Link to="/admin/all-photos" className={linkClass("/admin/all-photos")}>
                            <FontAwesomeIcon icon={faImages} />
                            All Photos
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className={linkClass("/")}><FontAwesomeIcon icon={faHouse} /> Home</Link>
                        <Link to="/project-selection" className={linkClass("/project-selection")}><FontAwesomeIcon icon={faDiagramProject} /> Project Selection</Link>
                        <Link to="/image-upload" className={linkClass("/image-upload")}><FontAwesomeIcon icon={faCloudArrowUp} /> Upload Images</Link>
                        <Link to="/gallery" className={linkClass("/gallery")}><FontAwesomeIcon icon={faImages} /> Gallery</Link>
                    </>
                )}
            </nav>
        </aside>
    );
}
export default Sidebar;