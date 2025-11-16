# 📸 Image Upload Management System

A modern, full-featured image upload and management system built with React, Vite, and TailwindCSS. This application provides separate interfaces for administrators and regular users to manage projects and upload images efficiently.

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-teal?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Overview

This is a comprehensive image management system that allows users to upload, organize, and view images across different projects. Built with modern web technologies, it features a beautiful UI, drag-and-drop uploads, real-time progress tracking, and role-based access control.

### Key Highlights

- ✨ **Modern UI/UX** - Beautiful, responsive interface built with TailwindCSS
- 🚀 **Fast Performance** - Powered by Vite for lightning-fast development and builds
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🔐 **Role-Based Access** - Separate interfaces for admins and users
- 🎯 **Drag & Drop** - Intuitive file upload with real-time progress
- 🖼️ **Gallery Viewer** - Beautiful image gallery with lightbox functionality
- 📊 **Admin Dashboard** - Statistics, charts, and comprehensive management

## 📖 Documentation

This project includes comprehensive documentation:

- **[📘 Complete Documentation](./DOCUMENTATION.md)** - Full technical documentation
- **[👤 User Guide](./USER_GUIDE.md)** - Step-by-step guide for end users
- **[🚀 Setup Instructions](./SETUP_INSTRUCTIONS.md)** - Installation and deployment guide

## ✨ Features

### For Users
- Browse and select projects
- Upload multiple images with drag & drop
- Add metadata (title, description, tags) to images
- Real-time upload progress tracking
- View images in a beautiful gallery
- Full-screen lightbox image viewer
- Search and filter capabilities
- Mobile-friendly interface

### For Administrators
- Dashboard with statistics and analytics
- User account management (CRUD)
- Project management (CRUD)
- View all photos across all projects
- Advanced filtering and search
- User activity monitoring
- Comprehensive data management

## 🛠 Tech Stack

### Core Technologies
- **[React 19.1.1](https://react.dev/)** - Modern UI library
- **[Vite 7.1.7](https://vitejs.dev/)** - Next-generation build tool
- **[React Router 6.30.1](https://reactrouter.com/)** - Client-side routing
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### Key Libraries
- **[React Dropzone](https://react-dropzone.js.org/)** - Drag and drop file upload
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Beautiful notifications
- **[Yet Another React Lightbox](https://yet-another-react-lightbox.com/)** - Image lightbox viewer
- **[Highcharts](https://www.highcharts.com/)** - Interactive charts
- **[FontAwesome](https://fontawesome.com/)** & **[Lucide React](https://lucide.dev/)** - Icon libraries

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+ or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tuanhandsomes/web_upload_image.git

# Navigate to project folder
cd web_upload_image/my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Default Login Credentials

#### User Account
```
Username: user1
Password: user123
```

#### Admin Account
```
Username: admin
Password: admin123
```

## 📁 Project Structure

```
my-app/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── common/        # Form components
│   │   ├── layout/        # Header, Sidebar, Footer
│   │   └── ui/            # Upload components
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ProjectContext.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useImageUploads.js
│   │   └── useLocalStorage.js
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin pages
│   │   └── user/          # User pages
│   ├── routes/            # Route protection
│   ├── services/          # Business logic layer
│   │   ├── accountService.js
│   │   ├── photoService.js
│   │   └── projectService.js
│   ├── utils/             # Helper functions
│   └── mockData/          # Initial data
├── public/                # Static assets
└── Configuration files
```

## 🎯 Usage

### For Users

1. **Login** → Navigate to `/login` and enter your credentials
2. **Select Project** → Choose a project from the available list
3. **Upload Images** → Drag & drop or browse to upload images
4. **Add Metadata** → Enter title, description, and tags
5. **View Gallery** → Browse and view your uploaded images

### For Administrators

1. **Login** → Navigate to `/admin/login` with admin credentials
2. **Dashboard** → View system statistics and analytics
3. **Manage Accounts** → Create, edit, or delete user accounts
4. **Manage Projects** → Create, edit, or delete projects
5. **View All Photos** → Browse and manage all uploaded images

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🏗️ Architecture

### Service Layer Pattern
Business logic is separated into service files, providing clean separation between UI and data operations.

### Context API
Global state management for authentication and project selection using React Context.

### Custom Hooks
Reusable logic encapsulated in custom hooks:
- `useLocalStorage` - Persistent state management
- `useImageUploads` - Complete upload workflow

### Route Protection
- `PrivateRoute` - Protects user routes (authentication required)
- `AdminRoute` - Protects admin routes (admin role required)

## 💾 Data Storage

Currently uses **LocalStorage** for data persistence:
- `accounts` - User account information
- `projects` - Project data
- `photos` - Image metadata and Base64 encoded images

**Note**: This is for demonstration purposes. For production, integrate with a backend API and database.

## 📊 Key Features Explained

### Image Upload System
- **Drag & Drop Interface** - Intuitive file selection
- **Progress Tracking** - Real-time upload progress for each file
- **Metadata Management** - Add titles, descriptions, and tags
- **Validation** - Client-side validation with helpful error messages
- **Multiple Files** - Upload multiple images simultaneously
- **File Size Limit** - Maximum 5MB per file
- **Format Support** - JPEG, PNG, GIF

### Gallery System
- **Grid Layout** - Responsive image grid
- **Lightbox Viewer** - Full-screen image viewing
- **Advanced Filtering** - By project, tags, date
- **Image Actions** - View, delete (with permissions)
- **Mobile Optimized** - Touch-friendly interactions

### Admin Dashboard
- **Statistics Cards** - Users, projects, photos, storage
- **Activity Charts** - User participation tracking (Highcharts)
- **Data Management** - Complete CRUD operations
- **User Activity** - Monitor uploads and usage

## 🔒 Security Features

- **Authentication System** - Secure login with credentials
- **Role-Based Access Control** - Separate admin and user roles
- **Route Protection** - Guards prevent unauthorized access
- **Account Status** - Active/inactive account management
- **Password Validation** - Minimum length requirements
- **Input Validation** - All forms validated

## 🎨 UI/UX Highlights

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Mobile-first approach
- **Toast Notifications** - Real-time feedback
- **Loading States** - Visual feedback during operations
- **Error Handling** - Helpful error messages
- **Accessibility** - Semantic HTML and ARIA labels
- **Dark Mode Support** - Coming soon

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy to:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

See [Setup Instructions](./SETUP_INSTRUCTIONS.md) for detailed deployment guides.

## 🔄 Roadmap

- [ ] Backend API integration (Node.js/Express)
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Cloud storage for images (AWS S3/Cloudinary)
- [ ] Advanced image editing features
- [ ] User profile management
- [ ] Email notifications
- [ ] Export/Import functionality
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Dark mode
- [ ] Image optimization and compression
- [ ] Batch operations for images
- [ ] Activity logs and audit trail

## 🐛 Known Issues

- LocalStorage has size limits (~5-10MB)
- Large images stored as Base64 can fill storage quickly
- No real-time synchronization between users
- No backend persistence (data lost on browser cache clear)

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**tuanhandsomes**

- GitHub: [@tuanhandsomes](https://github.com/tuanhandsomes)
- Repository: [web_upload_image](https://github.com/tuanhandsomes/web_upload_image)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- TailwindCSS for the utility-first CSS framework
- All open-source contributors

## 📞 Support

For questions and support:
- Open an issue on [GitHub Issues](https://github.com/tuanhandsomes/web_upload_image/issues)
- Read the [Documentation](./DOCUMENTATION.md)
- Check the [User Guide](./USER_GUIDE.md)

## 📸 Screenshots

### User Interface
- Login Page
- Project Selection
- Image Upload
- Gallery View

### Admin Interface
- Dashboard
- Account Management
- Project Management
- All Photos View

*(Screenshots coming soon)*

---

**Made with ❤️ using React and Vite**

**Last Updated**: November 14, 2025 | **Version**: 1.0.0
