import { useEffect, useState } from "react";

function Alert({ type = "success", message, duration = 3000, onClose }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!show) return null;

    const colors = {
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
    };

    return (
        <div
            className={` fixed top-15 right-1 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fadeIn ${colors[type]}`}
        >
            <span className="font-medium">{message}</span>
            <button
                className="ml-2 font-bold text-xl leading-none"
                onClick={() => setShow(false)}
            >
                &times;
            </button>
        </div>
    );
}

export default Alert;
