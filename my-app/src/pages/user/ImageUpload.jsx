import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faUpload } from "@fortawesome/free-solid-svg-icons";

import { useProject } from "../../contexts/ProjectContext";
import { useAuth } from "../../contexts/AuthContext";
import { useImageUploads } from "../../hooks/useImageUploads.js";
import ImageUploadDropzone from "../../components/ui/ImageUpLoadDropZone.jsx";
import FileUploadItem from "../../components/ui/FileUploadItem.jsx";

function ImageUpload() {
    const { selectedProject } = useProject();
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    // Nếu chưa chọn project, chuyển về trang chọn project
    useEffect(() => {
        if (!selectedProject) {
            navigate("/project-selection");
        }
    }, [selectedProject, navigate]);

    const {
        files,
        isUploading,
        getRootProps,
        getInputProps,
        isDragActive,
        handleUpload,
        removeFile,
        updateFileMetadata,
    } = useImageUploads(selectedProject, currentUser); // Truyền project và user vào hook

    // Nếu chưa chọn project, render rỗng để chờ redirect
    if (!selectedProject) {
        return null;
    }

    return (
        <div className="animate-fadeIn">
            {/* Header: Hiển thị project đã chọn */}
            <div className="p-5 bg-white rounded-2xl shadow-lg mb-6 flex items-center gap-4">
                <FontAwesomeIcon icon={faFolderOpen} className="text-3xl text-blue-500" />
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">
                        {selectedProject.name}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {selectedProject.description}
                    </p>
                </div>
            </div>

            {/* Grid 2 cột */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[60vh]">

                {/* Cột trái: Dropzone */}
                <div className="h-full">
                    <ImageUploadDropzone
                        getRootProps={getRootProps}
                        getInputProps={getInputProps}
                        isDragActive={isDragActive}
                    />
                </div>

                {/* Cột phải: Danh sách file */}
                <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header cột phải */}
                    <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Uploading Files
                            <span className="text-gray-400 font-normal ml-1">
                                ({files.length} {files.length === 1 ? 'file' : 'files'})
                            </span>
                        </h2>
                        <button
                            onClick={handleUpload}
                            disabled={isUploading || files.filter(f => f.status === 'waiting').length === 0}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg 
                             hover:bg-blue-700 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm
                             disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FontAwesomeIcon icon={faUpload} />
                            {isUploading ? 'Uploading...' : 'Upload All'}
                        </button>
                    </div>

                    {/* Danh sách file (cuộn được) */}
                    <div className="flex-1 overflow-y-auto p-2">
                        {files.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                No files selected.
                            </div>
                        ) : (
                            files.map(fileObj => (
                                <FileUploadItem
                                    key={fileObj.id}
                                    fileObject={fileObj}
                                    onRemove={() => removeFile(fileObj.id)}
                                    onMetadataChange={updateFileMetadata}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageUpload;
