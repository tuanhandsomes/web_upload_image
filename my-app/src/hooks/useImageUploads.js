import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { photoService } from "../services/photoService";
import { generateClientFileId } from "../utils/imageHelper";
import { validatePhotoMetadata } from "../utils/Validation";
export const useImageUploads = (selectedProject, currentUser) => {
    // files: danh sách các file (đã có preview, progress, status...)
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    // --- Cập nhật trạng thái cho 1 file ---
    const updateFileState = (id, state) => {
        setFiles(prevFiles =>
            prevFiles.map(f =>
                f.id === id ? { ...f, ...state } : f
            )
        );
    };

    // --- Xử lý khi thả file (onDrop) ---
    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        // Xử lý file bị từ chối (do sai type, size...)
        fileRejections.forEach(({ file, errors }) => {
            errors.forEach(err => {
                if (err.code === "file-too-large") {
                    toast.error(`File: ${file.name} quá lớn ( > 5MB).`);
                }
                if (err.code === "file-invalid-type") {
                    toast.error(`File: ${file.name} không đúng định dạng (jpg, png, gif).`);
                }
            });
        });

        // Xử lý file được chấp nhận
        const newFiles = acceptedFiles.map(file => ({
            id: generateClientFileId(file),
            file,
            preview: URL.createObjectURL(file), // Tạo link preview
            status: "waiting", // 'waiting', 'uploading', 'complete', 'error'
            progress: 0,
            errorMessage: null,
            title: file.name.replace(/\.[^/.]+$/, ""), // Tên file (bỏ đuôi) làm title mặc định
            description: "",
            tags: "", // Sẽ là chuỗi "tag1, tag2"
        }));

        // Thêm vào danh sách (chỉ thêm file chưa có)
        setFiles(prevFiles => [
            ...prevFiles,
            ...newFiles.filter(nf => !prevFiles.some(pf => pf.id === nf.id))
        ]);
    }, []);

    // --- hàm cập nhật metadata ---
    const updateFileMetadata = (id, field, value) => {
        setFiles(prevFiles =>
            prevFiles.map(f => {
                if (f.id === id) {
                    // 1. Tạo state mới
                    const updatedFile = { ...f, [field]: value };

                    // 2. Chạy validation TRÊN state MỚI
                    const validationErrors = validatePhotoMetadata(updatedFile);

                    // 3. Trả về state mới + errors
                    return { ...updatedFile, errors: validationErrors };
                }
                return f; // file khác
            })
        );
    };
    // hàm xử lý upload từng file
    const processUpload = async (fileObject) => {
        const { id, file, title, description, tags } = fileObject;

        const photoData = {
            projectId: selectedProject.id,
            title: title || file.name,
            description: description,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean) // Chuyển chuỗi thành mảng
        };

        try {
            // Bắt đầu upload
            updateFileState(id, { status: "uploading", progress: 10 });

            // Mô phỏng tiến trình upload ảnh
            await new Promise(res => setTimeout(res, 500)); // Đợi 0.5s
            updateFileState(id, { progress: 40 });

            await new Promise(res => setTimeout(res, 500)); // Đợi 0.5s
            updateFileState(id, { progress: 75 });

            // Gọi service (Đây là lúc upload thật)
            await photoService.create(photoData, file, currentUser.id);

            // Hoàn thành
            await new Promise(res => setTimeout(res, 300)); // Đợi 0.3s
            updateFileState(id, { status: "complete", progress: 100 });
            URL.revokeObjectURL(fileObject.preview); // Giải phóng bộ nhớ (xoá URL preview tạm thời)

        } catch (err) {
            updateFileState(id, { status: "error", errorMessage: err.message });
            throw err; // Ném lỗi ra ngoài để đếm số file lỗi
        }
    };

    // --- Hàm xử lý khi bấm vào button upload all ---
    const handleUpload = async () => {
        setIsUploading(true);

        const filesToUpload = files.filter(f => f.status === 'waiting');
        if (filesToUpload.length === 0) {
            toast.info("Không có file nào mới để upload.");
            setIsUploading(false);
            return;
        }

        // Đếm số file thất bại
        let failedCount = 0;
        // Duyệt từng file trong danh sách cần upload
        for (const fileObj of filesToUpload) {
            try {
                await processUpload(fileObj);
            } catch (err) {
                // Nếu 'processUpload' ném lỗi, đếm nó
                failedCount++;
            }
        }

        setIsUploading(false);

        if (failedCount > 0) {
            // Lỗi từ 'processUpload' đã được gán vào 'errorMessage' của file
            // và sẽ được bắt bởi catch trong 'processUpload'.
            // Ở đây là thông báo chung.
            toast.error(`Có ${failedCount} file upload thất bại (có thể do hết dung lượng LocalStorage).`);
        } else {
            toast.success("Tất cả file đã upload thành công!");
        }
    };

    // --- hàm xoá file (Khỏi danh sách chờ) ---
    const removeFile = (id) => {
        setFiles(prevFiles => prevFiles.filter(f => f.id !== id));
        // Nếu file đã có preview, thu hồi nó
        const file = files.find(f => f.id === id);
        if (file && file.preview) {
            URL.revokeObjectURL(file.preview);
        }
    };

    // --- cấu hình react-dropzone ---
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
        },
        maxSize: 5 * 1024 * 1024, // 5MB
    });
    // --- Trả về các giá trị và hàm từ hook ---
    return {
        files,
        isUploading,
        getRootProps,
        getInputProps,
        isDragActive,
        handleUpload,
        removeFile,
        updateFileMetadata,
    };
};
