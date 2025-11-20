import { convertFileToBase64 } from "../utils/imageHelper";
import { projectService } from "./projectService";

const API_URL = 'https://my-app-backend-efhe.onrender.com/photos';

export const photoService = {
    // Lấy tất cả ảnh (cho Admin)
    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch photos');
        return await response.json();
    },

    // Lấy ảnh theo Project (cho User)
    getPhotosByProjectId: async (projectId) => {
        const response = await fetch(`${API_URL}?projectId=${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch project photos');
        return await response.json();
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

        // Gửi lên Server (Lưu ảnh)
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPhoto)
        });

        if (!response.ok) throw new Error('Failed to save photo');
        return await response.json();
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
        const res = await fetch(`${API_URL}/${photoId}`);
        if (!res.ok) throw new Error("Không tìm thấy ảnh.");
        const photo = await res.json();

        // 2. Kiểm tra quyền (Admin hoặc Chủ sở hữu)
        // userId từ json-server có thể là số hoặc chuỗi, nên convert sang String để so sánh
        if (String(photo.userId) !== String(userId) && userRole !== 'admin') {
            throw new Error("Bạn không có quyền xóa ảnh này.");
        }

        // 3. Xóa ảnh trên server
        const deleteRes = await fetch(`${API_URL}/${photoId}`, {
            method: 'DELETE'
        });
        if (!deleteRes.ok) throw new Error("Lỗi khi xóa ảnh.");

        // Thay vì trừ 1 thủ công, ta gọi hàm này để nó tự đếm lại số lượng ảnh còn lại
        // và tự động chọn ảnh mới nhất làm ảnh bìa (nếu ảnh bìa vừa bị xóa).
        await photoService.updateProjectAfterUpload(photo.projectId);

        return true;
    },

    // Xóa tất cả ảnh của 1 project (Dùng khi xóa Project)
    deletePhotosByProjectId: async (projectId) => {
        const photos = await photoService.getPhotosByProjectId(projectId);

        const deletePromises = photos.map(photo =>
            fetch(`${API_URL}/${photo.id}`, { method: 'DELETE' })
        );

        await Promise.all(deletePromises);
        return true;
    }
};
