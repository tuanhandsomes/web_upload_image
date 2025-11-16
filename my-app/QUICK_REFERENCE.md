# 📚 Quick Reference - Image Upload Management System

## 🚀 Khởi động nhanh

```bash
# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm run dev

# Mở trình duyệt: http://localhost:5173
```

## 🔑 Tài khoản mặc định

### User (Người dùng)
```
Username: user1, user2, user3, user4, user5
Password: user123
```

### Admin (Quản trị viên)
```
Username: admin
Password: admin123
```

## 📂 Cấu trúc dự án chính

```
my-app/
├── src/
│   ├── components/         # Component tái sử dụng
│   ├── contexts/          # Context API (Auth, Project)
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Các trang chính
│   ├── services/          # Business logic
│   └── utils/             # Helper functions
├── public/                # Assets tĩnh
└── package.json           # Dependencies
```

## 🎯 Chức năng chính

### Người dùng
1. Đăng nhập tài khoản user
2. Chọn project từ danh sách
3. Upload ảnh (drag & drop hoặc browse)
4. Thêm metadata (title, description, tags)
5. Xem gallery và lightbox

### Admin
1. Đăng nhập tài khoản admin
2. Xem dashboard với thống kê
3. Quản lý tài khoản (thêm/sửa/xóa)
4. Quản lý projects (thêm/sửa/xóa)
5. Xem và quản lý tất cả ảnh

## 🛠 Công nghệ sử dụng

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool
- **React Router 6** - Routing
- **TailwindCSS 4** - Styling
- **React Dropzone** - File upload
- **React Toastify** - Notifications
- **Highcharts** - Charts
- **LocalStorage** - Data storage

## 📝 Scripts có sẵn

```bash
npm run dev       # Chạy development server
npm run build     # Build production
npm run preview   # Preview production build
npm run lint      # Kiểm tra code
```

## 🔗 Các URL quan trọng

```
Login User:     http://localhost:5173/login
Login Admin:    http://localhost:5173/admin/login
Dashboard:      http://localhost:5173/admin/dashboard
Projects:       http://localhost:5173/project-selection
Upload:         http://localhost:5173/image-upload
Gallery:        http://localhost:5173/gallery
```

## 📄 Tài liệu chi tiết

1. **[README.md](./README.md)** - Tổng quan dự án
2. **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Tài liệu kỹ thuật đầy đủ
3. **[USER_GUIDE.md](./USER_GUIDE.md)** - Hướng dẫn người dùng chi tiết
4. **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Hướng dẫn cài đặt và deployment

## 🎨 Quy trình làm việc User

```
Login → Chọn Project → Upload ảnh → Thêm metadata → Gallery
```

## 🔐 Quy trình làm việc Admin

```
Login → Dashboard → Quản lý Accounts/Projects/Photos
```

## 📊 Dữ liệu LocalStorage

- **Key: accounts** - Danh sách tài khoản
- **Key: projects** - Danh sách dự án  
- **Key: photos** - Danh sách ảnh (Base64)

## 🔧 Cấu hình quan trọng

### vite.config.js
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Thay đổi port
```javascript
export default defineConfig({
  server: { port: 3000 },
  plugins: [react(), tailwindcss()],
})
```

## 🐛 Troubleshooting nhanh

### Port đã được sử dụng
```bash
# Tìm và kill process
netstat -ano | findstr :5173
taskkill /PID [PID] /F
```

### Xóa cache và cài lại
```bash
rm -rf node_modules package-lock.json
npm install
```

### Reset dữ liệu LocalStorage
```javascript
// Trong browser console (F12)
localStorage.clear()
location.reload()
```

### Build lỗi
```bash
npm run lint          # Kiểm tra lỗi
rm -rf dist           # Xóa build cũ
npm run build         # Build lại
```

## 📏 Giới hạn

- **File size**: Max 5MB per image
- **Formats**: JPEG, PNG, GIF
- **Title**: Max 100 characters
- **Description**: Max 500 characters
- **LocalStorage**: ~5-10MB total

## 🎯 Validation rules

### Account
- Username: 3-20 ký tự, alphanumeric
- Email: Format email hợp lệ
- Password: Min 6 ký tự

### Project
- Name: 3-100 ký tự
- Description: Max 500 ký tự

### Photo
- Title: Max 100 ký tự
- Description: Max 500 ký tự
- Tags: Comma-separated

## 🔍 Tìm kiếm nhanh trong code

### AuthContext
```
src/contexts/AuthContext.jsx
```

### Upload logic
```
src/hooks/useImageUploads.js
```

### Services
```
src/services/accountService.js
src/services/projectService.js
src/services/photoService.js
```

### Routes
```
src/routes/AdminRoute.jsx
src/routes/PrivateRoute.jsx
```

## 📦 Build & Deploy

### Build
```bash
npm run build
# Output: dist/
```

### Preview
```bash
npm run preview
# http://localhost:4173
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## 🎓 Các khái niệm chính

### Service Layer
Business logic được tách ra thành các service files

### Context API
Quản lý state toàn cục (Auth, Project)

### Custom Hooks
- `useLocalStorage` - Persistent state
- `useImageUploads` - Upload workflow

### Route Guards
- `PrivateRoute` - User authentication
- `AdminRoute` - Admin authorization

## 💡 Tips

1. Đọc USER_GUIDE.md cho hướng dẫn chi tiết
2. Xem DOCUMENTATION.md cho kiến trúc kỹ thuật
3. Tham khảo SETUP_INSTRUCTIONS.md để deploy
4. Kiểm tra console (F12) khi có lỗi
5. Xóa LocalStorage khi cần reset data

## 📞 Hỗ trợ

- GitHub Issues: https://github.com/tuanhandsomes/web_upload_image/issues
- Đọc documentation đầy đủ
- Kiểm tra browser console

---

**Version**: 1.0.0 | **Last Updated**: November 14, 2025
