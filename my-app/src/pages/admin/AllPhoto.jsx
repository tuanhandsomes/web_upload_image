import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faImages,
    faExpand,
    faTrash,
    faFolder,
    faTags,
    faFilter
} from "@fortawesome/free-solid-svg-icons";

import { photoService } from "../../services/photoService";
import { projectService } from "../../services/projectService";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function ImageCard({ photo, onOpen, onDelete, canDelete }) {

    // Hàm tiện ích timeAgo(chuyển ngày)
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 86400; // Tính theo ngày
        if (interval > 1) {
            if (interval > 365) return `${Math.floor(interval / 365)} years ago`;
            if (interval > 30) return `${Math.floor(interval / 30)} months ago`;
            return `${Math.floor(interval)} days ago`;
        }
        interval = seconds / 3600;
        if (interval > 1) return `${Math.floor(interval)} hours ago`;
        interval = seconds / 60;
        if (interval > 1) return `${Math.floor(interval)} minutes ago`;
        return `${Math.floor(seconds)} seconds ago`;
    };

    return (
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md group">
            {/* Ảnh (Nền) */}
            <img
                src={photo.fileUrl}
                alt={photo.title}
                className="w-full h-full object-cover"
            />

            {/* - Mặc định: 'hidden' (Ẩn hoàn toàn trên di động)
              - Trên 'lg:' (Desktop): 'lg:flex' (Hiện)
              - Bắt đầu: 'opacity-0' (Ẩn)
              - Khi 'group' (cha) được hover: 'group-hover:opacity-100' (Hiện)
            */}
            <div className="absolute inset-0 bg-black/40 transition-all duration-300 
                        hidden lg:flex 
                        opacity-0 group-hover:opacity-100 
                        flex-col justify-between p-4">

                {/* Nút bấm (Desktop) */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onOpen}
                        title="View Fullsize"
                        className="w-10 h-10 bg-white/30 text-white rounded-full hover:bg-white/50 transition-all cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faExpand} />
                    </button>
                    {canDelete && (
                        <button
                            onClick={onDelete}
                            title="Delete Photo"
                            className="w-10 h-10 bg-red-600/70 text-white rounded-full hover:bg-red-500 transition-all cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    )}
                </div>

                {/* Thông tin (Desktop) */}
                <div className="text-white">
                    <h3 className="font-semibold text-lg truncate" title={photo.title}>
                        {photo.title}
                    </h3>
                    <p className="text-sm truncate" title={photo.description}>
                        {photo.description || "(No description)"}
                    </p>
                    <p className="text-white text-xs opacity-70 mt-1">
                        {timeAgo(photo.uploadedAt)}
                    </p>
                </div>
            </div>

            {/* --- lớp phủ title (chỉ dành cho di động/tablet) --- */}
            {/* - Mặc định: 'block' (Hiện)
              - Trên 'xl:' (Desktop): 'xl:hidden' (Ẩn đi)
            */}
            <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full 
                        xl:hidden">
                <h3 className="text-white font-medium text-base truncate" title={photo.title}>
                    {photo.title}
                </h3>

                <p className="text-white text-sm opacity-90 truncate" title={photo.description}>
                    {photo.description || "(No description)"}
                </p>
                <p className="text-white text-xs opacity-70 mt-1">
                    {timeAgo(photo.uploadedAt)}
                </p>
            </div>

            {/* --- lớp phủ nút bấm (chỉ dành cho di động/tablet) --- */}
            {/* - Mặc định: 'flex' (Hiện)
              - Trên 'xl:' (Desktop): 'xl:hidden' (Ẩn đi)
            */}
            <div className="absolute top-3 right-3 flex flex-row gap-2 
                        xl:hidden">
                <button
                    onClick={onOpen}
                    title="View Fullsize"
                    className="w-9 h-9 bg-white/70 text-black rounded-full shadow-md"
                >
                    <FontAwesomeIcon icon={faExpand} />
                </button>
                {canDelete && (
                    <button
                        onClick={onDelete}
                        title="Delete Photo"
                        className="w-9 h-9 bg-red-600 text-white rounded-full shadow-md"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                )}
            </div>
        </div>
    );
}

function AllPhoto() {
    const { user: currentUser } = useAuth();

    const [allPhotos, setAllPhotos] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedProjectId, setSelectedProjectId] = useState("all");
    const [selectedTag, setSelectedTag] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // --- lấy tất cả dữ liệu ---
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [photosData, projectsData] = await Promise.all([
                    photoService.getAll(),
                    projectService.getAll()
                ]);

                setAllPhotos(photosData); // Lấy tất cả ảnh (không lọc userId vì là admin)
                setProjectList(projectsData); // Lấy tất cả project

                // lấy Tags (từ tất cả ảnh)
                const tagsSet = new Set();
                photosData.forEach(photo => {
                    photo.tags.forEach(tag => tagsSet.add(tag));
                });
                setAllTags(Array.from(tagsSet).sort());

            } catch (err) {
                toast.error("Lỗi khi tải dữ liệu.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []); // Chỉ chạy 1 lần

    // --- logic lọc và sắp xếp ---
    const filteredPhotos = useMemo(() => {
        let photos = [...allPhotos];

        // lọc theo project
        if (selectedProjectId !== "all") {
            const pId = parseInt(selectedProjectId, 10);
            photos = photos.filter(p => p.projectId === pId);
        }

        // lọc theo tag
        if (selectedTag !== "all") {
            photos = photos.filter(p => p.tags.includes(selectedTag));
        }

        photos.sort((a, b) => {
            if (sortOrder === 'oldest') {
                return new Date(a.uploadedAt) - new Date(b.uploadedAt);
            }
            return new Date(b.uploadedAt) - new Date(a.uploadedAt);
        });

        return photos;
    }, [allPhotos, selectedProjectId, selectedTag, sortOrder]);

    // --- hàm xử lý khi open lightbox ---
    const openLightbox = (photoIndex) => {
        setIndex(photoIndex);
        setOpen(true);
    };

    const handleDeletePhoto = async (photoId) => {
        const confirmed = window.confirm("Bạn (Admin) có chắc muốn xóa ảnh này không?");
        if (!confirmed) return;

        try {
            await photoService.delete(photoId, currentUser.id, currentUser.role);
            toast.success("Đã xóa ảnh thành công!");
            setAllPhotos(prevPhotos => prevPhotos.filter(p => p.id !== photoId));

        } catch (err) {
            toast.error(err.message || "Lỗi khi xóa ảnh.");
        }
    };

    const slides = filteredPhotos.map(p => ({ src: p.fileUrl, title: p.title }));

    return (
        <div className="animate-fadeIn">
            {/* Header */}
            <div className="p-4 bg-white rounded-2xl shadow-lg mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faImages} className="text-3xl text-blue-500" />
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            All Photos (Admin View)
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'} found
                        </p>
                    </div>
                </div>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer 
                     hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {/* layout 2 cột --- */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* --- cột trái: filter sidebar --- */}
                <aside className="w-full md:w-64 bg-white p-5 rounded-2xl shadow-lg flex-shrink-0 h-fit">
                    {/* filter projects */}
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faFolder} className="text-gray-400" /> PROJECTS
                    </h3>
                    <ul className="space-y-1 mb-6">
                        <li>
                            <button
                                onClick={() => setSelectedProjectId("all")}
                                className={`w-full text-left text-sm px-3 py-1.5 rounded-md flex items-center gap-2 ${selectedProjectId === 'all' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <FontAwesomeIcon icon={faFilter} className="w-4" /> All Projects
                            </button>
                        </li>
                        {projectList.map(project => (
                            <li key={project.id}>
                                <button
                                    onClick={() => setSelectedProjectId(project.id)}
                                    className={`w-full text-left text-sm px-3 py-1.5 rounded-md truncate ${selectedProjectId === project.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                    title={project.name}
                                >
                                    {project.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Filter Tags */}
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTags} className="text-gray-400" /> TAGS
                    </h3>
                    <ul className="space-y-1">
                        <li>
                            <button
                                onClick={() => setSelectedTag("all")}
                                className={`w-full text-left text-sm px-3 py-1.5 rounded-md flex items-center gap-2 ${selectedTag === 'all' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <FontAwesomeIcon icon={faFilter} className="w-4" /> All Tags
                            </button>
                        </li>
                        {allTags.map(tag => (
                            <li key={tag}>
                                <button
                                    onClick={() => setSelectedTag(tag)}
                                    className={`w-full text-left text-sm px-3 py-1.5 rounded-md capitalize ${selectedTag === tag ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {tag}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* --- CỘT PHẢI: LƯỚI ẢNH --- */}
                <main className="flex-1 min-w-0">
                    {loading ? (
                        <div className="text-center p-10 text-gray-500">Loading gallery...</div>
                    ) : filteredPhotos.length === 0 ? (
                        <div className="text-center p-10 text-gray-500 bg-white rounded-2xl shadow-lg">
                            No photos found matching your filters.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredPhotos.map((photo, idx) => (
                                <ImageCard
                                    key={photo.id}
                                    photo={photo}
                                    onOpen={() => openLightbox(idx)}
                                    onDelete={() => handleDeletePhoto(photo.id)}
                                    // Admin luôn có quyền xóa
                                    canDelete={true}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Component Lightbox (ẩn) */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                index={index}
            />
        </div>
    );
}

export default AllPhoto;
