import { api } from "../utils/request";

export const projectService = {
    // Lấy tất cả project
    getAll: async () => {
        return await api.get('/projects');
    },

    // Lấy project theo ID
    getById: async (id) => {
        try {
            return await api.get(`/projects/${id}`);
        } catch (error) {
            throw new Error('Project not found');
        }
    },

    // Tạo project mới
    create: async (projectData, createdByUserId) => {
        // 1. Kiểm tra trùng tên (Case-insensitive)
        const name = projectData.name.trim();
        const checkData = await api.get(`/projects?name=${name}`);

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

        return await api.post('/projects', newProject);
    },

    // Cập nhật project
    update: async (id, projectData) => {
        // 1. Lấy dữ liệu cũ
        const currentProject = await projectService.getById(id);

        // 2. Kiểm tra trùng lặp (nếu đổi tên)
        if (projectData.name && projectData.name.toLowerCase() !== currentProject.name.toLowerCase()) {
            const name = projectData.name.trim();
            const checkData = await api.get(`/projects?name=${name}`);

            const nameExists = checkData.some(
                (p) => String(p.id) !== String(id) && p.name.toLowerCase() === name.toLowerCase()
            );

            if (nameExists) {
                throw new Error("Tên project đã tồn tại");
            }
        }

        // 3. Merge dữ liệu
        const updatedProject = {
            ...currentProject,
            ...projectData,
        };

        if (projectData.hasOwnProperty('name')) updatedProject.name = projectData.name.trim();
        if (projectData.hasOwnProperty('description')) updatedProject.description = projectData.description.trim();

        // 4. Gọi PUT /projects/:id
        return await api.put(`/projects/${id}`, updatedProject);
    },

    // Xóa project
    delete: async (id) => {
        return await api.delete(`/projects/${id}`);
    },
};
