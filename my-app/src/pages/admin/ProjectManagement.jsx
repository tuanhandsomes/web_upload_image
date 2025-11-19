import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPlus,
    faEllipsisV,
    faPen,
    faTrash,
    faImages,
    faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { projectService } from "../../services/projectService";
import { photoService } from "../../services/photoService";
import { useAuth } from "../../contexts/AuthContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import ProjectForm from "../../components/common/ProjectForm";
import EditProjectForm from "../../components/common/EditProjectForm";

// Component nhỏ để render mỗi card dự án
function ProjectCard({ project, onEdit, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const statusClass = project.status === "active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";

    // JSX của từng card dự án
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
                {project.coverPhotoUrl ? (
                    <img
                        src={project.coverPhotoUrl}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faImages} className="text-gray-400 text-4xl" />
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.name}</h3>
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            onBlur={() => setTimeout(() => setMenuOpen(false), 200)} // Delay để kịp click menu
                            className="text-gray-500 hover:text-gray-800 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="absolute right-0 top-10 w-36 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-300">
                                <button
                                    onClick={onEdit}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faPen} className="w-4" /> Edit
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="w-4" /> Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-gray-600 text-sm h-16">{project.description}</p>
            </div>

            {/* Chân Card (Stats) */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faImages} /> {project.photoCount} photos
                    </span>

                    <span className={`px-2 py-0.5 rounded-full font-medium ${statusClass}`}>
                        {/* Lấy status và viết hoa chữ cái đầu tiên + phần còn lại */}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                </div>
                <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric"
                    })}
                </span>
            </div>
        </div>
    );
}

function ProjectManagement() {
    const { user: currentUser } = useAuth(); // Lấy admin đang đăng nhập
    const [projectList, setProjectList] = useState([]);
    const [loading, setLoading] = useState(true);

    // States cho Filter và Search
    const [search, setSearch] = useLocalStorage("project_search", "");
    const [statusFilter, setStatusFilter] = useLocalStorage("project_status_filter", "all");
    const [sortOrder, setSortOrder] = useLocalStorage("project_sort_order", "newest"); // 'newest', 'oldest', 'name'

    // States cho Modal
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // 1. Hàm tải danh sách project từ server
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const projects = await projectService.getAll();
            setProjectList(projects);
        } catch (err) {
            toast.error("Lỗi khi tải danh sách dự án.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // --- lọc và sắp xếp dữ liệu ---
    const filteredProjects = useMemo(() => {
        let projects = [...projectList];

        // Lọc theo Status
        if (statusFilter !== "all") {
            projects = projects.filter((p) => p.status === statusFilter);
        }

        // Lọc theo Search
        if (search) {
            projects = projects.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Sắp xếp
        projects.sort((a, b) => {
            switch (sortOrder) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "oldest":
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case "newest":
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return projects;
    }, [projectList, search, statusFilter, sortOrder]);

    const handleCreateProject = async (projectData) => {
        try {
            await projectService.create(projectData, currentUser.id);
            toast.success("Tạo project thành công!");
            setShowCreateForm(false);
            await fetchProjects(); // Tải lại danh sách
        } catch (err) {
            // Ném lỗi để Form con bắt và hiển thị
            throw err;
        }
    };

    const handleUpdateProject = async (id, projectData) => {
        try {
            await projectService.update(id, projectData);
            toast.success("Cập nhật project thành công!");
            setEditingProject(null);
            await fetchProjects(); // Tải lại danh sách
        } catch (err) {
            // Ném lỗi để Form con bắt và hiển thị
            throw err;
        }
    };

    const handleDeleteProject = async (project) => {
        let confirmed = false;
        if (project.photoCount > 0) {
            confirmed = window.confirm(
                `Project "${project.name}" đang có ${project.photoCount} ảnh. \n\nXoá project sẽ xoá tất cả ảnh liên quan. Bạn có chắc chắn muốn xoá không?`
            );
        }
        else {
            confirmed = window.confirm(
                `Bạn có chắc chắn muốn xoá project "${project.name}" không?`
            );
        }
        if (!confirmed) return;

        try {
            if (project.photoCount > 0) {
                await photoService.deletePhotosByProjectId(project.id);
            }
            await projectService.delete(project.id);

            toast.success("Xoá project thành công!");
            await fetchProjects(); // Tải lại danh sách
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="p-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Project Management
                    </h1>
                    <span className="text-sm text-gray-500">
                        {filteredProjects.length} projects
                    </span>
                </div>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg 
                        hover:bg-blue-700 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm
                       w-full md:w-auto" // w-full (di động), md:w-auto (desktop)
                >
                    <FontAwesomeIcon icon={faPlus} /> Create Project
                </button>
            </div>
            {/* filter bar */}
            <div className="bg-white shadow-sm rounded-xl p-4 mb-6 
                        flex flex-col md:flex-row md:flex-wrap gap-3 md:items-center">
                {/* Search: w-full (di động), md:w-1/3 (desktop) */}
                <div className="relative w-full md:flex-grow-0 md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Filter Status: w-full (di động), md:w-auto (desktop) */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer 
                                hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200 
                                w-full md:w-auto"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                {/* Sort Order: w-full (di động), md:w-auto (desktop) */}
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer 
                                hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200
                                w-full md:w-auto"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name">Name (A-Z)</option>
                </select>
            </div>
            {/* Grid dữ liệu */}
            {loading ? (
                <div className="text-center p-10 text-gray-500">Loading projects...</div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center p-10 text-gray-500">No projects found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onEdit={() => setEditingProject(project)}
                            onDelete={() => handleDeleteProject(project)}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            {showCreateForm && (
                <ProjectForm
                    onClose={() => setShowCreateForm(false)}
                    onSave={handleCreateProject}
                />
            )}
            {editingProject && (
                <EditProjectForm
                    project={editingProject}
                    onClose={() => setEditingProject(null)}
                    s onSave={handleUpdateProject}
                />
            )}
        </div>
    );
}

export default ProjectManagement;
