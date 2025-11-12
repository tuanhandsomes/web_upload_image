// src/services/projectService.js
import projectsData from "../mockData/projects.json";
import { getData, saveData } from "../utils/storage";

const STORAGE_KEY = "projects";

const initProjects = () => {
    const stored = getData(STORAGE_KEY);
    if (!stored || stored.length === 0) {
        saveData(STORAGE_KEY, projectsData.projects);
        return projectsData.projects;
    }
    return stored;
};

initProjects();

export const projectService = {
    getAll: () => {
        const projects = getData(STORAGE_KEY, []);
        return Promise.resolve(projects);
    },

    getById: (id) => {
        const projects = getData(STORAGE_KEY, []);
        const project = projects.find((p) => p.id === id);
        return Promise.resolve(project);
    },

    create: (projectData, createdByUserId) => {
        const projects = getData(STORAGE_KEY, []);

        const nameExists = projects.some(
            (p) => p.name.toLowerCase() === projectData.name.toLowerCase()
        );
        if (nameExists) {
            return Promise.reject(new Error("Tên project đã tồn tại"));
        }

        const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;

        const newProject = {
            id: newId,
            name: projectData.name.trim(),
            description: projectData.description.trim(),
            status: projectData.status,
            photoCount: 0,
            createdAt: new Date().toISOString(),
            createdBy: createdByUserId,
        };

        const updatedList = [...projects, newProject];
        saveData(STORAGE_KEY, updatedList);
        return Promise.resolve(newProject);
    },

    update: (id, projectData) => {
        const projects = getData(STORAGE_KEY, []);
        const index = projects.findIndex((p) => p.id === id);

        if (index === -1) {
            return Promise.reject(new Error("Project not found"));
        }

        const currentProject = projects[index];

        // 1. Kiểm tra trùng lặp (CHỈ KHI TÊN THỰC SỰ THAY ĐỔI)
        if (
            projectData.name && // Nếu 'name' được gửi đến
            projectData.name.toLowerCase() !== currentProject.name.toLowerCase() // VÀ nó khác tên cũ
        ) {
            // Chỉ lúc này mới chạy kiểm tra
            const nameExists = projects.some(
                (p) =>
                    p.name.toLowerCase() === projectData.name.toLowerCase() &&
                    p.id !== id
            );
            if (nameExists) {
                return Promise.reject(new Error("Tên project đã tồn tại"));
            }
        }

        // 2. Cập nhật dữ liệu (Ghi đè tất cả)
        const updatedProject = {
            ...currentProject, // Nền là project cũ
            ...projectData,     // Ghi đè bằng dữ liệu mới (gồm photoCount, coverPhotoUrl, v.v.)
        };

        // Trim lại các trường text (nếu chúng được gửi đến)
        if (projectData.hasOwnProperty('name')) {
            updatedProject.name = projectData.name.trim();
        }
        if (projectData.hasOwnProperty('description')) {
            updatedProject.description = projectData.description.trim();
        }

        projects[index] = updatedProject;
        saveData(STORAGE_KEY, projects);

        return Promise.resolve(updatedProject);
    },

    delete: (id) => {
        const projects = getData(STORAGE_KEY, []);
        const updatedList = projects.filter((p) => p.id !== id);

        if (projects.length === updatedList.length) {
            return Promise.reject(new Error("Project not found"));
        }

        saveData(STORAGE_KEY, updatedList);
        return Promise.resolve();
    },
};