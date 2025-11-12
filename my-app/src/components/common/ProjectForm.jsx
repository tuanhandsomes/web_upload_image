// src/components/ui/ProjectForm.jsx
import { useState } from "react";
import { validateProjectForm } from "../../utils/Validation";

function ProjectForm({ onClose, onSave }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        status: "active",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serviceError, setServiceError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "status") {
            setForm({ ...form, status: checked ? "active" : "inactive" });
        } else {
            setForm({ ...form, [name]: value });
        }

        setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi người dùng gõ vào ô input
        setServiceError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServiceError(null);

        const validationErrors = validateProjectForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const projectData = {
                name: form.name.trim(),
                description: form.description.trim(),
                status: form.status,
            }
            await onSave(projectData);
        } catch (err) {
            setServiceError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[550px] p-6 animate-fadeIn">
                <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
                <p className="text-gray-500 mb-4 text-sm">
                    Enter details for the new project.
                </p>

                {serviceError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
                        {serviceError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Project Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Project Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            // --- hiển thị viền đỏ khi lỗi ---
                            className={`border rounded-md w-full p-2 focus:ring focus:ring-blue-200 ${errors.name ? "border-red-500" : "border-gray-200"
                                }`}
                            placeholder="e.g. Website Upload Image"
                            disabled={loading}
                        />
                        {/* hiển thị lỗi 'name' */}
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            // --- hiển thị viền đỏ khi lỗi ---
                            className={`border rounded-md w-full p-2 focus:ring focus:ring-blue-200 ${errors.description ? "border-red-500" : "border-gray-200"
                                }`}
                            placeholder="Enter a short description..."
                            disabled={loading}
                        />
                        {/* hiển thị lỗi 'description' */}
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <div className="border border-gray-200 rounded-md w-full p-2 flex items-center justify-between">
                            <span className="text-gray-700 font-medium">Active Project</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    name="status"
                                    type="checkbox"
                                    checked={form.status === "active"}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                    disabled={loading}
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none 
                                        rounded-full peer
                                        peer-checked:bg-[#3B82F6]
                                        transition-colors duration-300 ease-in-out
                                        after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                                        after:bg-white after:border-gray-300 after:border after:rounded-full
                                        after:h-5 after:w-5 after:transition-all
                                        peer-checked:after:translate-x-full peer-checked:after:border-white"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6 border-t border-gray-200 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProjectForm;