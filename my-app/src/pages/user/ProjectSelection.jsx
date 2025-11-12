import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faImages,
    faCalendarAlt,
    faPhotoFilm,
    faUpload,
    faSearch
} from "@fortawesome/free-solid-svg-icons";

import { projectService } from "../../services/projectService";
import { useProject } from "../../contexts/ProjectContext";
import { toast } from "react-toastify";

function UserProjectCard({ project, onSelect }) {

    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
            <div className="h-48 bg-gray-200">
                {project.coverPhotoUrl ? (
                    <img
                        src={project.coverPhotoUrl}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faPhotoFilm} className="text-gray-400 text-4xl" />
                    </div>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.name}</h3>
                <span className="text-sm text-blue-600 mb-2 flex items-center gap-1">
                    <FontAwesomeIcon icon={faImages} /> {project.photoCount} photos
                </span>
                <p className="text-gray-600 text-sm mb-4 flex-1 break-words">
                    {project.description}
                </p>
                <div className="text-xs text-gray-400 flex justify-between mb-4">
                    <span className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        Created: {new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span>Last updated: {timeAgo(project.createdAt)}</span>
                </div>
                <button
                    onClick={onSelect}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <FontAwesomeIcon icon={faUpload} />
                    Select & Upload
                </button>
            </div>
        </div>
    );
}

// --- component trang chính ---
function ProjectSelection() {
    const [projectList, setProjectList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useLocalStorage("user_project_search", "");
    const [sortOrder, setSortOrder] = useLocalStorage("user_project_sort", "newest");

    const { selectProject } = useProject();
    const navigate = useNavigate();

    useEffect(() => {
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
        fetchProjects();
    }, []);

    const displayProjects = useMemo(() => {
        let projects = projectList.filter(p => p.status === 'active');

        if (search) {
            projects = projects.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        projects.sort((a, b) => {
            switch (sortOrder) {
                case 'name_az':
                    return a.name.localeCompare(b.name);
                case 'name_za':
                    return b.name.localeCompare(a.name);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'newest':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return projects;
    }, [projectList, search, sortOrder]);

    const handleSelectProject = (project) => {
        selectProject(project);
        navigate('/image-upload');
    };

    return (
        <div className="animate-fadeIn">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Choose Your Project
                </h1>
                <p className="text-gray-500">
                    Select a project to start uploading your photos
                </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white shadow-sm rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
                <div className="relative flex-grow sm:flex-grow-0 sm:w-1/3">
                    <input
                        type="text"
                        placeholder="Search projects by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer 
                     hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name_az">Name (A-Z)</option>
                    <option value="name_za">Name (Z-A)</option>
                </select>
            </div>

            {/* Grid Dữ liệu */}
            {loading ? (
                <div className="text-center p-10 text-gray-500">Loading projects...</div>
            ) : displayProjects.length === 0 ? (
                <div className="text-center p-10 text-gray-500">
                    No active projects found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProjects.map((project) => (
                        <UserProjectCard
                            key={project.id}
                            project={project}
                            onSelect={() => handleSelectProject(project)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProjectSelection;
