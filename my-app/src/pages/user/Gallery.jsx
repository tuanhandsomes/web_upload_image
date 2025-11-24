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
import ConfirmModal from "../../components/ui/ConfirmModal";

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
            {/*  Ảnh (Nền) */}
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
                        lg:hidden">
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

            <div className="lg:hidden">

                {/* Thông tin Mobile (Góc dưới) */}
                <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full">
                    <h3 className="text-white font-semibold text-base truncate" title={photo.title}>
                        {photo.title}
                    </h3>
                    <p className="text-white text-sm opacity-90 truncate" title={photo.description}>
                        {photo.description || ""}
                    </p>
                    <p className="text-white text-xs opacity-70 mt-1">
                        {timeAgo(photo.uploadedAt)}
                    </p>
                </div>

                {/* Nút bấm Mobile (Góc trên) */}
                <div className="absolute top-3 right-3 flex flex-row gap-2">
                    <button
                        onClick={onOpen}
                        className="w-9 h-9 bg-white/70 text-black rounded-full shadow-md flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faExpand} />
                    </button>
                    {canDelete && (
                        <button
                            onClick={onDelete}
                            className="w-9 h-9 bg-red-600 text-white rounded-full shadow-md flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function Gallery() {
    const { user: currentUser } = useAuth();

    // Data State
    const [allPhotos, setAllPhotos] = useState([]); // Chứa TẤT CẢ ảnh của user
    const [projectList, setProjectList] = useState([]); // Chứa TẤT CẢ project
    const [allTags, setAllTags] = useState([]); // Chứa TẤT CẢ tags
    const [loading, setLoading] = useState(true);

    // Filter State
    const [selectedProjectId, setSelectedProjectId] = useState("all"); // 'all' hoặc ID
    const [selectedTags, setSelectedTags] = useState([]); // Mảng tags đã chọn
    const [sortOrder, setSortOrder] = useState("newest"); // 'newest' hoặc 'oldest'

    // Lightbox State
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [photoIdToDelete, setPhotoIdToDelete] = useState(null);

    // --- lấy tất cả dữ liệu khi tải trang ---
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Lấy song song 2 loại dữ liệu
                const [photosData, projectsData] = await Promise.all([
                    photoService.getAll(), // Lấy tất cả ảnh
                    projectService.getAll() // Lấy tất cả project
                ]);

                setAllPhotos(photosData);

                const activeProjects = projectsData.filter(p => p.status === 'active');
                setProjectList(activeProjects);

                // Lấy tất cả Tags (từ tất cả ảnh)
                const tagsSet = new Set();
                photosData.forEach(photo => {
                    photo.tags.forEach(tag => tagsSet.add(tag));
                });
                setAllTags(Array.from(tagsSet).sort()); // Sắp xếp A-Z

            } catch (err) {
                toast.error("Lỗi khi tải dữ liệu.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []); // chỉ chạy 1 lần khi mount

    const toggleTag = (tag) => {
        if (tag === 'all') {
            setSelectedTags([]); // Xóa hết = Chọn All
            return;
        }

        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                // Nếu đã có -> Xóa đi (Uncheck)
                return prev.filter(t => t !== tag);
            } else {
                // Nếu chưa có -> Thêm vào (Check)
                return [...prev, tag];
            }
        });
    };
    // --- logic lọc và sắp xếp ---
    const filteredPhotos = useMemo(() => {
        let photos = [...allPhotos];

        // Lọc theo Project
        if (selectedProjectId !== "all") {
            // So sánh chuỗi ID (vì json-server dùng string ID)
            photos = photos.filter(p => String(p.projectId) === String(selectedProjectId));
        }

        // Lọc theo Tag
        if (selectedTags.length > 0) {
            // Giữ lại ảnh nào có CHỨA ít nhất 1 tag trong danh sách đã chọn
            photos = photos.filter(p =>
                p.tags.some(photoTag => selectedTags.includes(photoTag))
            );
        }

        // Sắp xếp theo Ngày
        photos.sort((a, b) => {
            if (sortOrder === 'oldest') {
                return new Date(a.uploadedAt) - new Date(b.uploadedAt); // Cũ nhất
            }
            return new Date(b.uploadedAt) - new Date(a.uploadedAt); // Mới nhất (mặc định)
        });

        return photos;
    }, [allPhotos, selectedProjectId, selectedTags, sortOrder]);

    // Mở Lightbox tại ảnh được chọn
    const openLightbox = (photoIndex) => {
        setIndex(photoIndex);
        setOpen(true);
    };

    const confirmDeletePhoto = (photoId) => {
        setPhotoIdToDelete(photoId);
        setIsDeleteModalOpen(true);
    };

    const handleDeletePhoto = async (photoId) => {
        if (!photoIdToDelete) return;
        try {
            await photoService.delete(photoIdToDelete, currentUser.id, currentUser.role);
            toast.success("Đã xóa ảnh thành công!");
            setAllPhotos(prev => prev.filter(p => p.id !== photoIdToDelete));
        } catch (err) {
            toast.error(err.message || "Lỗi khi xóa ảnh.");
        } finally {
            setIsDeleteModalOpen(false);
            setPhotoIdToDelete(null);
        }
    };

    // Tạo slides cho Lightbox từ danh sách đã lọc
    const slides = filteredPhotos.map(p => ({ src: p.fileUrl, title: p.title }));

    return (
        <div className="animate-fadeIn">
            {/* Header: "My Gallery" + Nút Sort */}
            <div className="p-4 bg-white rounded-2xl shadow-lg mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faImages} className="text-3xl text-blue-500" />
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            My Gallery
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'} found
                        </p>
                    </div>
                </div>
                {/* Nút Sắp xếp */}
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

            {/* --- layout 2 cột --- */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* --- cột trái: filter sidebar --- */}
                <aside className="w-full lg:w-64 bg-white p-5 rounded-2xl shadow-lg flex-shrink-0 h-fit">
                    {/* filter projects */}
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <FontAwesomeIcon icon={faFolder} className="text-gray-400" /> PROJECTS
                    </h3>
                    <ul className="space-y-1 mb-6">
                        {/* Nút All Projects */}
                        <li>
                            <button
                                onClick={() => setSelectedProjectId("all")}
                                className={`w-full text-left text-sm px-3 py-1.5 rounded-md flex items-center gap-2 ${selectedProjectId === 'all' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <FontAwesomeIcon icon={faFilter} className="w-4" /> All Projects
                            </button>
                        </li>
                        {/* Danh sách Projects */}
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
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <FontAwesomeIcon icon={faTags} className="text-gray-400" /> TAGS
                    </h3>

                    {/* giao diện tags */}
                    <div className="flex flex-wrap gap-2">
                        {/* Nút All Tags */}
                        <button
                            onClick={() => toggleTag('all')}
                            className={`px-3 py-1 text-xs font-medium rounded-full border transition-all
                            ${selectedTags.length === 0 // Nếu mảng rỗng thì là đang chọn All
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-500'
                                }`}
                        >
                            All
                        </button>

                        {/* Danh sách các Tag */}
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all capitalize
                                ${selectedTags.includes(tag) // Kiểm tra xem tag có trong mảng không
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-500'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* --- cột phải: danh sách ảnh --- */}
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
                                    onDelete={() => confirmDeletePhoto(photo.id)}
                                    canDelete={currentUser.id === photo.userId}
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
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeletePhoto}
                title="Delete Photo"
                message="Bạn có chắc chắn muốn xóa ảnh này không?"
                confirmText="Delete"
            />
        </div>
    );
}

export default Gallery;
