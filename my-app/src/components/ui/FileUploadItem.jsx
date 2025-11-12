import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheckCircle, faExclamationCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { formatBytes } from "../../utils/imageHelper";

function FileUploadItem({ fileObject, onRemove, onMetadataChange }) {
    const { file, preview, status, progress, errorMessage, title, description, tags } = fileObject;

    // --- Xác định màu và icon file ---
    let color = "text-gray-500";
    let icon = faSpinner;
    let statusText = `Chờ upload...`; // Sửa text mặc định

    if (status === 'uploading') {
        color = "text-blue-500";
        icon = faSpinner;
        statusText = `Uploading... ${progress}%`;
    } else if (status === 'complete') {
        color = "text-green-500";
        icon = faCheckCircle;
        statusText = "Upload complete";
    } else if (status === 'error') {
        color = "text-red-500";
        icon = faExclamationCircle;
        statusText = errorMessage || "Upload failed";
    }

    // --- Hàm xử lý khi gõ vào input ---
    const handleChange = (e) => {
        onMetadataChange(fileObject.id, e.target.name, e.target.value);
    };

    return (
        <div className="flex items-start gap-4 p-4 border-b border-gray-200">
            {/* Thumbnail */}
            <img src={preview} alt={file.name} className="w-16 h-16 rounded-md object-cover" />

            {/* Info (flex-1) */}
            <div className="flex-1">
                {/* Tên file & Size (Luôn hiển thị) */}
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800 truncate w-40" title={file.name}>
                        {file.name}
                    </span>
                    <span className="text-xs text-gray-500">{formatBytes(file.size)}</span>
                </div>

                {/* --- hiển thị điều kiện --- */}
                {status === 'waiting' ? (
                    // hiển thị form metadata (khi chờ upload)
                    <div className="space-y-2 mt-2">
                        {/* Title Input */}
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChange}
                            placeholder="Title (mặc định là tên file)"
                            className="w-full text-sm border-gray-300 rounded-md shadow-sm p-1.5 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {/* Description Input */}
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Description (optional)"
                            className="w-full text-sm border-gray-300 rounded-md shadow-sm p-1.5 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {/* Tags Input */}
                        <input
                            type="text"
                            name="tags"
                            value={tags}
                            onChange={handleChange}
                            placeholder="Tags, cách nhau bằng dấu phẩy (,) "
                            className="w-full text-sm border-gray-300 rounded-md shadow-sm p-1.5 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ) : (
                    // hiển thị progress bar (khi upload/ upload xong/ lỗi)
                    <div className="mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                                className={`h-1.5 rounded-full transition-all duration-300 ${status === 'complete' ? 'bg-green-500' : (status === 'error' ? 'bg-red-500' : 'bg-blue-500')}`}
                                style={{ width: `${status === 'error' ? 100 : progress}%` }}
                            ></div>
                        </div>
                        <div className={`mt-1 text-xs font-medium ${color} flex items-center gap-1.5`}>
                            <FontAwesomeIcon icon={icon} className={status === 'uploading' ? 'animate-spin' : ''} />
                            {statusText}
                        </div>
                    </div>
                )}
            </div>

            {/* Nút Xóa (Luôn hiển thị, trừ khi đang upload) */}
            {status !== 'uploading' && (
                <button
                    onClick={() => onRemove(fileObject.id)} // gọi onRemove(id)
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove file"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            )}
        </div>
    );
}

export default FileUploadItem;
