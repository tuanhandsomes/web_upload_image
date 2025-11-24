// src/components/ui/ConfirmModal.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", confirmColor = "bg-red-600" }) {
    if (!isOpen) return null;

    return (
        // 1. Lớp phủ (Overlay) - Click vào đây sẽ đóng modal
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fadeIn"
            onClick={onClose}
        >
            {/* 2. Hộp Modal - Dùng stopPropagation để click vào hộp không bị đóng */}
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-gray-600">{message}</p>
                </div>

                {/* Footer (Buttons) */}
                <div className="p-4 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors font-medium shadow-sm ${confirmColor} cursor-pointer`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;