import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

function ImageUploadDropzone({ getRootProps, getInputProps, isDragActive }) {
    return (
        // {...getRootProps()} gán các sự kiện (onClick, onDrag...)
        <div
            {...getRootProps()}
            // Thay đổi giao diện khi đang kéo file
            className={`flex flex-col items-center justify-center h-full p-10 
            rounded-2xl bg-white shadow-lg cursor-pointer transition-all duration-300
            border-4 border-dashed 
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
            <input {...getInputProps()} />

            <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className={`text-6xl transition-all duration-300 ${isDragActive ? 'text-blue-600' : 'text-blue-400'}`}
            />

            {isDragActive ? (
                <p className="mt-4 text-2xl font-semibold text-blue-600">Drop the files here ...</p>
            ) : (
                <>
                    <p className="mt-4 text-2xl font-semibold text-gray-700">Drop photos here</p>
                    <p className="text-gray-500">or click to browse files</p>
                    <p className="text-xs text-gray-400 mt-4">(Max 5MB per file. PNG, JPG, GIF)</p>
                </>
            )}
        </div>
    );
}

export default ImageUploadDropzone;
