// Hàm chuyển file thành Base64
export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); // Tạo đối tượng FileReader
        reader.readAsDataURL(file); // Đọc file dưới dạng Data URL (Base64)
        reader.onload = () => resolve(reader.result); // Khi đọc xong, trả về kết quả
        reader.onerror = (error) => reject(error); // Nếu lỗi, trả về lỗi
    });
};

// Hàm format size file
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024; // Số byte trong 1 KB
    const dm = decimals < 0 ? 0 : decimals; // Số chữ số thập phân
    const sizes = ['Bytes', 'KB', 'MB', 'GB']; // Đơn vị
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // Chỉ số đơn vị
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]; // Hàm format
};

// Hàm helper để tạo ID duy nhất cho file ở client theo tên, kích thước và thời gian
export const generateClientFileId = (file) => {
    return `${file.name}-${file.size}-${file.lastModified}`;
};