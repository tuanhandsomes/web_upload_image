const API_URL = 'https://my-app-backend-efhe.onrender.com/projects';

export const projectService = {
    // Lấy tất cả project
    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch projects');
        return await response.json();
    },

    // Lấy project theo ID
    getById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Project not found');
        return await response.json();
    },

    // Tạo project mới
    create: async (projectData, createdByUserId) => {
        // 1. Kiểm tra trùng tên (Case-insensitive)
        const name = projectData.name.trim();
        const checkRes = await fetch(`${API_URL}?name=${name}`);
        const checkData = await checkRes.json();

        // Kiểm tra kỹ hơn về chữ hoa/thường
        const nameExists = checkData.some(
            (p) => p.name.toLowerCase() === name.toLowerCase()
        );

        if (nameExists) {
            throw new Error("Tên project đã tồn tại");
        }

        // 2. Tạo object project mới
        const newProject = {
            id: String(Date.now()), // ID dạng string cho json-server
            name: name,
            description: projectData.description.trim(),
            status: projectData.status,
            photoCount: 0,
            coverPhotoUrl: null,
            createdAt: new Date().toISOString(),
            createdBy: createdByUserId,
        };

        // 3. Gửi lên Server
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });

        if (!response.ok) throw new Error('Failed to create project');
        return await response.json();
    },

    update: async (id, projectData) => {
        // 1. Lấy dữ liệu cũ từ server để làm nền
        const currentProject = await projectService.getById(id);

        // 2. Kiểm tra trùng lặp (Chỉ khi tên thay đổi)
        // Logic: Nếu có gửi 'name' lên VÀ 'name' đó khác với 'name' hiện tại
        if (
            projectData.name &&
            projectData.name.toLowerCase() !== currentProject.name.toLowerCase()
        ) {
            const name = projectData.name.trim();
            const checkRes = await fetch(`${API_URL}?name=${name}`);
            const checkData = await checkRes.json();

            // Lọc bỏ chính project đang sửa ra khỏi kết quả check
            const nameExists = checkData.some(
                (p) => String(p.id) !== String(id) && p.name.toLowerCase() === name.toLowerCase()
            );

            if (nameExists) {
                throw new Error("Tên project đã tồn tại");
            }
        }

        // 3. Chuẩn bị dữ liệu cập nhật (Merge)
        const updatedProject = {
            ...currentProject, // Giữ lại data cũ
            ...projectData,    // Ghi đè data mới (photoCount, coverPhotoUrl, hoặc name/desc)
        };

        // Trim dữ liệu text nếu có
        if (projectData.hasOwnProperty('name')) {
            updatedProject.name = projectData.name.trim();
        }
        if (projectData.hasOwnProperty('description')) {
            updatedProject.description = projectData.description.trim();
        }

        // 4. Gửi lệnh PUT lên Server
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProject)
        });

        if (!response.ok) throw new Error('Failed to update project');
        return await response.json();
    },

    // Xóa project
    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete project');
        return await response.json();
    },
};
