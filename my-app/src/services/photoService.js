import { api } from "../utils/request";
import { convertFileToBase64 } from "../utils/imageHelper";
import { projectService } from "./projectService";

export const photoService = {
    // Lấy tất cả ảnh (cho Admin)
    getAll: async () => {
        return await api.get('/photos');
    },

    // Lấy ảnh theo Project (cho User)
    getPhotosByProjectId: async (projectId) => {
        return await api.get(`/photos?projectId=${projectId}`);
    },

    // Upload ảnh mới
    create: async (photoData, file, userId) => {
        if (file.size > 5 * 1024 * 1024) {
            throw new Error("File quá lớn. Tối đa 5MB.");
        }

        // Chuyển sang Base64
        let fileUrl;
        try {
            fileUrl = await convertFileToBase64(file);
        } catch (err) {
            throw new Error("Lỗi khi đọc file ảnh.");
        }

        // Tạo object ảnh
        const newPhoto = {
            id: String(Date.now()) + Math.random().toString(36).substr(2, 9), // ID chuỗi duy nhất
            projectId: photoData.projectId,
            userId: userId,
            title: photoData.title || file.name,
            description: photoData.description || "",
            tags: photoData.tags || [],
            fileName: file.name,
            fileSize: file.size,
            fileUrl: fileUrl, // Base64 string
            uploadedAt: new Date().toISOString(),
        };

        return await api.post('/photos', newPhoto);
    },

    updateProjectAfterUpload: async (projectId) => {

        try {
            // 1. Lấy danh sách ảnh thực tế của project từ server
            const photos = await photoService.getPhotosByProjectId(projectId);

            // 2. Tính toán số lượng thật
            const realCount = photos.length;

            // 3. Lấy ảnh mới nhất làm ảnh bìa (ảnh cuối cùng trong mảng)
            const latestPhoto = photos.length > 0 ? photos[photos.length - 1] : null;
            const newCoverUrl = latestPhoto ? latestPhoto.fileUrl : null;

            // 4. Cập nhật Project với số liệu chính xác
            await projectService.update(projectId, {
                photoCount: realCount,
                coverPhotoUrl: newCoverUrl
            });
        } catch (err) {
            console.error("Lỗi khi đồng bộ project:", err);
        }
    },

    // Xóa ảnh
    delete: async (photoId, userId, userRole) => {
        // 1. Lấy thông tin ảnh để kiểm tra quyền
        const photo = await api.get(`/photos/${photoId}`);

        // 2. Kiểm tra quyền
        if (String(photo.userId) !== String(userId) && userRole !== 'admin') {
            throw new Error("Bạn không có quyền xóa ảnh này.");
        }

        // 3. Gọi DELETE /photos/:id
        await api.delete(`/photos/${photoId}`);

        // 4. Cập nhật lại Project (Đếm lại từ đầu)
        await photoService.updateProjectAfterUpload(photo.projectId);

        return true;
    },

    // Xóa tất cả ảnh của 1 project (Dùng khi xóa Project)
    deletePhotosByProjectId: async (projectId) => {
        const photos = await photoService.getPhotosByProjectId(projectId);

        const deletePromises = photos.map(photo =>
            api.delete(`/photos/${photo.id}`)
        );

        await Promise.all(deletePromises);
        return true;
    }
};
