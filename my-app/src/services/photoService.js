import photosData from "../mockData/photos.json";
import { getData, saveData } from "../utils/storage";
import { projectService } from "./projectService";
import { convertFileToBase64 } from "../utils/imageHelper";

const PHOTO_STORAGE_KEY = "photos";

// Queue để xử lý upload tuần tự, tránh race condition
let uploadQueue = Promise.resolve();

const initPhotos = () => {
    const stored = getData(PHOTO_STORAGE_KEY);
    if (!stored || stored.length === 0) {
        saveData(PHOTO_STORAGE_KEY, photosData.photos);
        return photosData.photos;
    }
    return stored;
};

initPhotos();

export const photoService = {
    getAll: () => {
        const photos = getData(PHOTO_STORAGE_KEY, []);
        return Promise.resolve(photos);
    },

    getPhotosByProjectId: (projectId) => {
        const photos = getData(PHOTO_STORAGE_KEY, []);
        const projectPhotos = photos.filter(
            (p) => p.projectId === projectId
        );
        return Promise.resolve(projectPhotos);
    },

    create: async (photoData, file, userId) => {
        // Thêm vào queue để xử lý tuần tự
        return new Promise((resolve, reject) => {
            uploadQueue = uploadQueue.then(async () => {
                try {
                    if (file.size > 5 * 1024 * 1024) { // 5MB
                        throw new Error("File quá lớn. Tối đa 5MB.");
                    }

                    let fileUrl;
                    try {
                        fileUrl = await convertFileToBase64(file);
                    } catch (err) {
                        throw new Error("Lỗi khi đọc file ảnh.");
                    }

                    // Đọc lại photos từ storage để đảm bảo có dữ liệu mới nhất
                    const photos = getData(PHOTO_STORAGE_KEY, []);
                    const newId = photos.length > 0 ? Math.max(...photos.map((p) => p.id)) + 1 : 1;

                    const newPhoto = {
                        id: newId,
                        projectId: photoData.projectId,
                        userId: userId,
                        title: photoData.title || file.name,
                        description: photoData.description || "",
                        tags: photoData.tags || [],
                        fileName: file.name,
                        fileSize: file.size,
                        fileUrl: fileUrl,
                        uploadedAt: new Date().toISOString(),
                    };

                    // Lưu photo ngay lập tức
                    const updatedList = [...photos, newPhoto];
                    saveData(PHOTO_STORAGE_KEY, updatedList);

                    // Cập nhật project count
                    const project = await projectService.getById(photoData.projectId);
                    if (project) {
                        // Đọc lại projects từ storage để đảm bảo có dữ liệu mới nhất
                        const projects = getData("projects", []);
                        const currentProject = projects.find(p => p.id === photoData.projectId);

                        if (currentProject) {
                            const updatedProject = {
                                ...currentProject,
                                photoCount: currentProject.photoCount + 1,
                                coverPhotoUrl: currentProject.coverPhotoUrl || newPhoto.fileUrl
                            };

                            await projectService.update(project.id, updatedProject);
                        }
                    }

                    resolve(newPhoto);
                } catch (error) {
                    reject(error);
                }
            }).catch(reject);
        });
    },

    delete: async (photoId, userId, userRole) => {
        const photos = getData(PHOTO_STORAGE_KEY, []);

        const photoIndex = photos.findIndex(p => p.id === photoId);
        if (photoIndex === -1) {
            return Promise.reject(new Error("Không tìm thấy ảnh."));
        }

        const photo = photos[photoIndex];

        // Chỉ cho phép xóa nếu là admin hoặc là người upload ảnh
        if (photo.userId !== userId && userRole !== "admin") {
            return Promise.reject(new Error("Bạn không có quyền xóa ảnh này."));
        }

        const updatedList = photos.filter((p) => p.id !== photoId);
        saveData(PHOTO_STORAGE_KEY, updatedList);

        try {
            const project = await projectService.getById(photo.projectId);
            if (project) {
                const updatedProject = { ...project, photoCount: Math.max(0, project.photoCount - 1) };

                // Nếu ảnh bị xóa là ảnh bìa, ta cần xóa ảnh bìa
                if (project.coverPhotoUrl === photo.fileUrl) {
                    updatedProject.coverPhotoUrl = null; // Hoặc tìm 1 ảnh khác làm bìa
                }

                await projectService.update(project.id, updatedProject);
            }
        } catch (err) {
            console.error("Lỗi khi cập nhật photoCount (delete):", err);
        }

        return Promise.resolve();
    },

    deletePhotosByProjectId: (projectId) => {
        const photos = getData(PHOTO_STORAGE_KEY, []);

        // Lọc và giữ lại tất cả ảnh không thuộc project này
        const updatedList = photos.filter(
            (p) => p.projectId !== projectId
        );

        saveData(PHOTO_STORAGE_KEY, updatedList);
        return Promise.resolve();
    }
};
