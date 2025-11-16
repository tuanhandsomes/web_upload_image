# 📸 Image Upload Management System - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [User Guide](#user-guide)
4. [Admin Guide](#admin-guide)
5. [Architecture & Technical Details](#architecture--technical-details)
6. [API Reference](#api-reference)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### What is this application?

The Image Upload Management System is a modern web application that allows users to upload, manage, and organize images across different projects. It features separate interfaces for regular users and administrators, with complete CRUD operations for accounts, projects, and photos.

### Key Features

#### 👤 For Users
- Upload multiple images with drag & drop
- Add metadata (title, description, tags) to images
- View images in a beautiful gallery with lightbox
- Track upload progress in real-time
- Browse and select projects
- Responsive design for all devices

#### 🔐 For Admins
- Manage user accounts (create, edit, delete)
- Manage projects (create, edit, delete)
- View all photos across all projects
- Dashboard with statistics and charts
- Advanced filtering and search capabilities
- Monitor user activity

---

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.0 or higher)
- **npm** (version 9.0 or higher) or **yarn**
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A code editor (VS Code recommended)

### Installation Steps

#### Step 1: Clone or Download the Project

```bash
# If using git
git clone https://github.com/tuanhandsomes/web_upload_image.git
cd web_upload_image/my-app

# Or download and extract the ZIP file, then navigate to the folder
cd path/to/reactjs_upload_image_project/my-app
```

#### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

This will install all required packages including:
- React and React DOM
- React Router
- TailwindCSS
- React Dropzone
- React Toastify
- Highcharts
- FontAwesome and Lucide icons
- And more...

#### Step 3: Start the Development Server

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The application will start on `http://localhost:5173` (default Vite port).

#### Step 4: Access the Application

Open your web browser and navigate to:
- **User Login**: `http://localhost:5173/login`
- **Admin Login**: `http://localhost:5173/admin/login`

### Building for Production

To create a production-ready build:

```bash
# Using npm
npm run build

# Or using yarn
yarn build
```

The optimized files will be generated in the `dist/` folder.

To preview the production build locally:

```bash
# Using npm
npm run preview

# Or using yarn
yarn preview
```

### Project Scripts

```json
{
  "dev": "vite",              // Start development server
  "build": "vite build",      // Build for production
  "lint": "eslint .",         // Check code quality
  "preview": "vite preview"   // Preview production build
}
```

---

## User Guide

### 1. Logging In (User)

1. Navigate to `http://localhost:5173/login`
2. Enter your credentials:
   - **Username or Email**: `user1` (or `user1@example.com`)
   - **Password**: `user123`
3. Click **"Sign In"**

**Available Test Accounts:**
- user1 / user123
- user2 / user456
- user3 / user789
- user4 / user000
- user5 / user123

### 2. Selecting a Project

After logging in, you'll be redirected to the **Project Selection** page.

#### Features:
- **Search Bar**: Find projects by name or description
- **Sort Options**: 
  - Newest First
  - Oldest First
  - Name A-Z
  - Name Z-A
- **Project Cards**: Display project information with:
  - Cover photo (if available)
  - Project name
  - Number of photos
  - Description
  - Creation date

#### Steps:
1. Browse the available projects
2. Use the search bar to filter projects
3. Click **"Select & Upload"** on your desired project

### 3. Uploading Images

Once you've selected a project, you'll be taken to the **Image Upload** page.

#### Upload Methods:

**Method 1: Drag & Drop**
1. Drag image files from your computer
2. Drop them into the upload zone
3. Files will be added to the upload queue

**Method 2: Click to Browse**
1. Click anywhere in the upload zone
2. Select image files from the file picker
3. Click "Open"

#### File Requirements:
- **Accepted Formats**: JPEG, JPG, PNG, GIF
- **Maximum Size**: 5MB per file
- **Multiple Files**: Yes, you can upload multiple images at once

#### Adding Metadata:

For each uploaded file, you can add:

1. **Title** (Optional, max 100 characters)
   - Default: filename without extension
   - Example: "Summer Vacation 2024"

2. **Description** (Optional, max 500 characters)
   - Example: "Beach photos from our summer trip"

3. **Tags** (Optional)
   - Enter tags separated by commas
   - Example: "beach, vacation, summer"

#### Upload Process:

1. Add files to the queue
2. Edit metadata for each file (optional)
3. Click **"Upload All"** button
4. Watch the progress bars for each file
5. Files turn green when successfully uploaded
6. Toast notifications confirm completion

#### Upload Queue Management:

- **Remove Files**: Click the trash icon on any file
- **Edit Metadata**: Type directly in the input fields
- **Validation**: Real-time error messages for invalid data
- **Upload Status**: 
  - ⏳ Waiting (gray)
  - ⬆️ Uploading (blue with progress)
  - ✅ Complete (green)
  - ❌ Error (red with message)

### 4. Viewing Gallery

Navigate to the **Gallery** page to view all uploaded images.

#### Features:

**Filter Options:**
- **By Project**: Select specific projects
- **By Tags**: Filter by image tags
- **By Date**: Filter by upload date
- **Search**: Search in titles and descriptions

**Display Modes:**
- Grid view (default)
- Responsive layout (1-4 columns based on screen size)

**Image Actions:**
- **View Full Size**: Click the expand icon (desktop) or tap image (mobile)
- **Delete**: Click trash icon (only for your own images)

#### Lightbox Viewer:

When viewing full-size images:
- Navigate with arrow keys or swipe gestures
- Close with ESC key or close button
- Zoom in/out (if supported by browser)
- View image information

#### Mobile Experience:

- Optimized touch interactions
- Swipe to navigate in lightbox
- Tap image to view full size
- All features accessible on small screens

### 5. Changing Projects

To switch to a different project:

1. Navigate to **Project Selection** from the sidebar
2. Select a new project
3. The system will remember your selection

### 6. Logging Out

Click the **"Logout"** button in the header to sign out.

---

## Admin Guide

### 1. Logging In (Admin)

1. Navigate to `http://localhost:5173/admin/login`
2. Enter admin credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Click **"Sign In"**

### 2. Dashboard

The admin dashboard provides an overview of system statistics:

#### Statistics Cards:
- **Total Users**: Number of registered users
- **Active Projects**: Number of active projects
- **Total Photos**: Total uploaded images
- **Storage Used**: Total storage consumption

#### Charts:
- **User Activity Chart**: Monthly user participation
- **Recent Uploads**: Latest uploaded images
- **Top Projects**: Projects with most photos

### 3. Account Management

Navigate to **Accounts** from the sidebar.

#### Viewing Accounts:

- **Table View**: All accounts in a sortable table
- **Columns**: ID, Username, Email, Role, Status, Created Date, Actions
- **Search**: Filter by username or email
- **Sort**: Click column headers to sort

#### Creating a New Account:

1. Click **"Add New Account"** button
2. Fill in the form:
   - **Username**: 3-20 characters, alphanumeric only
   - **Email**: Valid email format
   - **Password**: Minimum 6 characters
   - **Confirm Password**: Must match password
   - **Role**: Select "admin" or "user"
   - **Status**: Select "active" or "inactive"
3. Click **"Create Account"**
4. Success notification will appear

#### Validation Rules:
- Username must be unique
- Email must be unique and valid
- Password minimum 6 characters
- All fields are required

#### Editing an Account:

1. Click the **Edit** icon (pencil) in the Actions column
2. Modify the desired fields
3. Note: Password field is optional (leave blank to keep current)
4. Click **"Update Account"**

#### Deleting an Account:

1. Click the **Delete** icon (trash) in the Actions column
2. Confirm the deletion in the modal
3. Account will be permanently removed
4. All photos uploaded by this user will also be deleted

### 4. Project Management

Navigate to **Projects** from the sidebar.

#### Viewing Projects:

- **Card View**: Projects displayed as cards
- **Information**: Name, description, photo count, cover photo
- **Search**: Filter by project name
- **Sort Options**: Newest, Oldest, Most Photos, Least Photos

#### Creating a New Project:

1. Click **"Add New Project"** button
2. Fill in the form:
   - **Project Name**: 3-100 characters, required
   - **Description**: Up to 500 characters, optional
   - **Status**: Select "active" or "inactive"
3. Click **"Create Project"**

#### Editing a Project:

1. Click the **Edit** icon on a project card
2. Modify the fields
3. Click **"Update Project"**
4. Note: Photo count and cover photo are auto-updated

#### Deleting a Project:

1. Click the **Delete** icon on a project card
2. Confirm the deletion
3. **Warning**: This will also delete all photos in this project!

### 5. All Photos Management

Navigate to **All Photos** from the sidebar.

#### Advanced Filtering:

- **By Project**: Select one or multiple projects
- **By User**: Filter by uploader
- **By Tags**: Search images by tags
- **By Date Range**: Set start and end dates
- **Search**: Find by title or description

#### Viewing Photos:

- Grid layout with image cards
- Hover to see full information (desktop)
- Tap to view details (mobile)
- Click expand icon to view full size

#### Deleting Photos:

1. Click the **Delete** icon on an image
2. Confirm deletion
3. Photo is permanently removed
4. Project photo count is automatically updated

#### Batch Operations (Future):

- Select multiple photos
- Bulk delete
- Bulk tag editing
- Export selected photos

---

## Architecture & Technical Details

### Project Structure

```
my-app/
├── src/
│   ├── components/         # Reusable React components
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── routes/            # Route guards
│   ├── services/          # Business logic layer
│   ├── utils/             # Helper functions
│   └── mockData/          # Initial data
├── public/                # Static assets
└── Configuration files
```

### Technology Stack

#### Core Technologies:
- **React 19.1.1**: Latest React version with new features
- **Vite 7.1.7**: Fast build tool and dev server
- **TailwindCSS 4**: Utility-first CSS framework

#### Routing:
- **React Router 6**: Client-side routing with route protection

#### State Management:
- **React Context API**: Global state for auth and project selection
- **Custom Hooks**: Encapsulated logic (useLocalStorage, useImageUploads)
- **LocalStorage**: Persistent data storage

#### UI Libraries:
- **React Dropzone**: Drag & drop file upload
- **React Toastify**: Toast notifications
- **Yet Another React Lightbox**: Image viewer
- **Highcharts**: Data visualization
- **FontAwesome & Lucide React**: Icon libraries

### Data Management

#### Storage Strategy:

All data is stored in **LocalStorage** with three main keys:

1. **accounts**: User accounts array
2. **projects**: Projects array
3. **photos**: Photos array (with Base64 encoded images)

#### Service Layer Pattern:

```javascript
// Example: photoService.js
export const photoService = {
    getAll: () => Promise<Photo[]>,
    getPhotosByProjectId: (projectId) => Promise<Photo[]>,
    create: (photoData, file, userId) => Promise<Photo>,
    delete: (photoId, userId, userRole) => Promise<void>
}
```

All services return Promises for consistency and future backend integration.

#### Data Relationships:

```
User (id) ───> Photos (userId)
           └──> Projects (createdBy)

Project (id) ──> Photos (projectId)
```

### Authentication & Authorization

#### AuthContext:

```javascript
{
    user: {
        id, username, email, role, status
    },
    login: (userData) => void,
    logout: () => void,
    loading: boolean
}
```

#### Route Protection:

- **PrivateRoute**: Checks if user is logged in
- **AdminRoute**: Checks if user is admin role

#### Access Control:

- Users can only delete their own photos
- Admins can delete any photo
- Inactive accounts cannot log in
- Role-based sidebar menu

### Image Handling

#### Upload Process:

1. **File Validation**: Check size, type, and format
2. **Base64 Conversion**: Convert file to Base64 string
3. **Metadata Addition**: Add title, description, tags
4. **Storage**: Save to LocalStorage
5. **Project Update**: Increment photo count, update cover

#### Image Storage:

```javascript
{
    id: number,
    projectId: number,
    userId: number,
    title: string,
    description: string,
    tags: string[],
    fileName: string,
    fileSize: number,
    fileUrl: string,  // Base64 data URL
    uploadedAt: string
}
```

#### Size Limit:

- Maximum 5MB per file
- Validation before upload
- Error message if exceeded

### State Management Flow

```
User Action
    ↓
Component (useState)
    ↓
Service Layer
    ↓
LocalStorage (getData/saveData)
    ↓
Context Update (if global state)
    ↓
Re-render Components
```

### Validation

#### Form Validation:

All forms use validation functions from `utils/Validation.js`:

- **validateCredentials**: Login validation
- **validateAccountForm**: Account creation/editing
- **validateProjectForm**: Project creation/editing
- **validatePhotoMetadata**: Image metadata validation

#### Real-time Validation:

- Errors shown immediately as user types
- Field-specific error messages
- Disabled submit button if invalid

### Performance Optimizations

1. **Code Splitting**: React Router lazy loading
2. **Memoization**: useMemo for expensive computations
3. **Debounced Search**: Prevents excessive re-renders
4. **LocalStorage Caching**: Fast data retrieval
5. **Image Optimization**: Size limits prevent performance issues

---

## API Reference

### AccountService

```javascript
// Get all accounts
accountService.getAll()
    .then(accounts => console.log(accounts))

// Get account by ID
accountService.getById(1)
    .then(account => console.log(account))

// Create new account
accountService.create({
    username: 'newuser',
    email: 'new@example.com',
    password: 'password123',
    role: 'user',
    status: 'active'
})

// Update account
accountService.update(1, {
    username: 'updateduser',
    email: 'updated@example.com'
})

// Delete account
accountService.delete(1)
```

### ProjectService

```javascript
// Get all projects
projectService.getAll()
    .then(projects => console.log(projects))

// Get project by ID
projectService.getById(1)
    .then(project => console.log(project))

// Create new project
projectService.create({
    name: 'New Project',
    description: 'Project description',
    status: 'active'
}, userId)

// Update project
projectService.update(1, {
    name: 'Updated Project',
    photoCount: 10,
    coverPhotoUrl: 'data:image/...'
})

// Delete project
projectService.delete(1)
```

### PhotoService

```javascript
// Get all photos
photoService.getAll()
    .then(photos => console.log(photos))

// Get photos by project
photoService.getPhotosByProjectId(1)
    .then(photos => console.log(photos))

// Create new photo
photoService.create({
    projectId: 1,
    title: 'Photo Title',
    description: 'Description',
    tags: ['tag1', 'tag2']
}, fileObject, userId)

// Delete photo
photoService.delete(photoId, userId, userRole)
```

### Custom Hooks

#### useLocalStorage

```javascript
const [value, setValue] = useLocalStorage('key', initialValue)

// Works like useState but syncs with LocalStorage
setValue('new value')
```

#### useImageUploads

```javascript
const {
    files,              // Array of file objects with status
    isUploading,        // Boolean: upload in progress
    getRootProps,       // Props for dropzone container
    getInputProps,      // Props for file input
    isDragActive,       // Boolean: drag in progress
    handleUpload,       // Function: start upload
    removeFile,         // Function: remove file from queue
    updateFileMetadata  // Function: update title/desc/tags
} = useImageUploads(selectedProject, currentUser)
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Application won't start

**Error**: `Cannot find module` or `Module not found`

**Solution**:
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Start again
npm run dev
```

#### 2. Port already in use

**Error**: `Port 5173 is already in use`

**Solution**:
- Kill the process using port 5173
- Or change the port in `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000  // Use different port
  },
  plugins: [react(), tailwindcss()]
})
```

#### 3. Login not working

**Issue**: Cannot log in with correct credentials

**Solution**:
- Clear browser LocalStorage (F12 → Application → LocalStorage → Clear)
- Refresh the page
- Try again with default credentials
- Check browser console for errors

#### 4. Images not uploading

**Issue**: Upload fails or images don't appear

**Solution**:
- Check file size (max 5MB)
- Check file format (JPEG, PNG, GIF only)
- Check browser console for errors
- Clear LocalStorage if it's full
- Try with a smaller image

#### 5. LocalStorage full

**Error**: `QuotaExceededError`

**Solution**:
- LocalStorage has ~5-10MB limit per domain
- Clear old data: F12 → Application → LocalStorage → Clear
- Use smaller images
- Delete unnecessary photos

#### 6. Build fails

**Error**: Build errors during `npm run build`

**Solution**:
```bash
# Clear cache
rm -rf node_modules/.vite

# Try building again
npm run build

# If still failing, check for ESLint errors
npm run lint
```

#### 7. Styles not loading

**Issue**: Application looks broken, no styling

**Solution**:
- Ensure TailwindCSS is properly installed
- Check `index.css` imports TailwindCSS
- Clear browser cache (Ctrl+Shift+R)
- Check console for CSS errors

#### 8. React Router not working after build

**Issue**: Routes work in dev but not in production

**Solution**:
- Configure server for SPA routing
- For development preview, use `npm run preview`
- Ensure `.htaccess` or server config redirects to `index.html`

### Debug Mode

To enable detailed logging, add to your component:

```javascript
useEffect(() => {
    console.log('Current State:', {
        user,
        selectedProject,
        files
    })
}, [user, selectedProject, files])
```

### Browser Compatibility

Recommended browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Not supported:
- Internet Explorer (any version)

### Getting Help

1. Check browser console for errors (F12)
2. Check Network tab for failed requests
3. Verify LocalStorage data is correct
4. Try in incognito mode
5. Check GitHub Issues: https://github.com/tuanhandsomes/web_upload_image/issues

---

## Appendix

### Keyboard Shortcuts

- **ESC**: Close lightbox
- **Arrow Keys**: Navigate images in lightbox
- **Ctrl + F**: Focus search (in most browsers)

### Default Data

The application comes with:
- 1 admin account
- 12 user accounts (user1-user12)
- 2 sample projects
- No sample photos (upload your own)

### Resetting Data

To reset all data to defaults:

1. Open browser console (F12)
2. Run:
```javascript
localStorage.clear()
location.reload()
```
3. The app will reinitialize with default data

### File Limits

- Max file size: 5MB
- Accepted formats: .jpg, .jpeg, .png, .gif, .webp
- Max title length: 100 characters
- Max description: 500 characters

### Browser LocalStorage Limits

- Chrome: ~10MB
- Firefox: ~10MB
- Safari: ~5MB
- Edge: ~10MB

---

**Last Updated**: November 14, 2025
**Version**: 1.0.0
**Author**: tuanhandsomes
