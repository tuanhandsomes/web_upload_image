# 📘 User Guide - Image Upload Management System

## Getting Started

Welcome to the Image Upload Management System! This guide will help you navigate the application and make the most of its features.

---

## Table of Contents

1. [First Time Setup](#first-time-setup)
2. [Logging In](#logging-in)
3. [Navigating the Interface](#navigating-the-interface)
4. [Selecting a Project](#selecting-a-project)
5. [Uploading Images](#uploading-images)
6. [Managing Your Uploads](#managing-your-uploads)
7. [Viewing the Gallery](#viewing-the-gallery)
8. [Tips & Best Practices](#tips--best-practices)
9. [Frequently Asked Questions](#frequently-asked-questions)

---

## First Time Setup

### What You Need

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Your login credentials (username/email and password)
- Images you want to upload (JPEG, PNG, GIF format)

### Accessing the Application

1. Open your web browser
2. Navigate to the application URL (e.g., `http://localhost:5173/login`)
3. You'll see the login page

---

## Logging In

### Step-by-Step Login Process

1. **Open the Login Page**
   - URL: `http://localhost:5173/login`

2. **Enter Your Credentials**
   - **Email or Username**: Type your username or email address
   - **Password**: Enter your password (minimum 6 characters)

3. **Click "Sign In"**
   - If credentials are correct, you'll be redirected to the Project Selection page
   - If incorrect, you'll see an error message

### Demo Accounts for Testing

```
Username: user1
Password: user123

Username: user2
Password: user456

Username: user3
Password: user789
```

### Troubleshooting Login Issues

**Problem**: "Username or password incorrect"
- **Solution**: Check for typos, ensure Caps Lock is off

**Problem**: Cannot log in even with correct credentials
- **Solution**: Clear browser cache and try again

**Problem**: Account is inactive
- **Solution**: Contact your administrator to activate your account

---

## Navigating the Interface

### Main Navigation Menu (Sidebar)

After logging in, you'll see a sidebar with the following options:

- **📁 Project Selection**: Choose which project to upload images to
- **⬆️ Image Upload**: Upload images to your selected project
- **🖼️ Gallery**: View all your uploaded images
- **👤 Profile** (top right): Your account information
- **🚪 Logout** (top right): Sign out of the application

### Header Bar

- **Project Name**: Shows your currently selected project
- **User Info**: Your username and avatar
- **Logout Button**: Click to sign out

### Responsive Design

- **Desktop**: Full sidebar visible
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu icon (☰) - tap to open sidebar

---

## Selecting a Project

### Why Select a Project?

Before uploading images, you need to select which project they belong to. This helps organize your images into meaningful categories.

### How to Select a Project

1. **Navigate to "Project Selection"** from the sidebar
2. **Browse Available Projects**
   - View project cards showing:
     - Project name
     - Description
     - Number of photos already uploaded
     - Cover photo (if available)
     - Creation date

3. **Search for Projects** (Optional)
   - Use the search bar at the top
   - Type project name or keywords
   - Results filter in real-time

4. **Sort Projects** (Optional)
   - Click the sort dropdown
   - Options:
     - **Newest First**: Recently created projects
     - **Oldest First**: Oldest projects first
     - **Name A-Z**: Projects name from a to z
     - **Name Z-A**: Projects name from z to a

5. **Click "Select & Upload"** on your desired project
   - You'll be redirected to the Upload page
   - The project name will appear in the header

### Project Card Information

Each project card displays:
- **Cover Image**: Visual preview of the project
- **Project Name**: Title of the project
- **Photo Count**: Number of images in this project
- **Description**: Brief description of the project
- **Created Date**: When the project was created
- **Last Updated**: How long ago the project was modified

---

## Uploading Images

### Upload Page Overview

Once you've selected a project, you'll see:
- **Left Side**: Drop zone for uploading files
- **Right Side**: Upload queue showing your files

### Method 1: Drag & Drop Upload

1. **Prepare Your Images**
   - Find the images on your computer
   - Select one or multiple files

2. **Drag to Drop Zone**
   - Click and hold on your files
   - Drag them over to the upload area
   - The area will highlight when you're hovering
   - Release to drop the files

3. **Files Added to Queue**
   - Files appear in the right panel
   - Preview thumbnails are generated

### Method 2: Click to Browse

1. **Click Anywhere in the Drop Zone**
   - A file picker dialog will open

2. **Select Your Images**
   - Navigate to your images folder
   - Select one or multiple files
   - Hold Ctrl (Windows) or Cmd (Mac) to select multiple

3. **Click "Open"**
   - Files are added to the upload queue

### File Requirements

#### Accepted Formats
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ GIF (.gif)

#### File Size
- **Maximum**: 5MB per file
- **Recommended**: 1-2MB for optimal performance

#### Rejected Files
If a file is rejected, you'll see a notification explaining why:
- "File too large (> 5MB)"
- "Invalid file type"

### Adding Metadata to Your Images

Each image in the queue has editable fields:

#### 1. Title
- **Purpose**: Name of the image
- **Default**: Filename (without extension)
- **Max Length**: 100 characters
- **Example**: "Summer Beach Sunset"
- **Tips**: Use descriptive, searchable names

#### 2. Description
- **Purpose**: Detailed description of the image
- **Default**: Empty
- **Max Length**: 500 characters
- **Example**: "Beautiful sunset at Santa Monica Beach during our summer vacation"
- **Tips**: Add context, location, date, or story

#### 3. Tags
- **Purpose**: Keywords for searching and filtering
- **Format**: Comma-separated values
- **Example**: "beach, sunset, summer, vacation"
- **Tips**: Use relevant keywords, keep tags lowercase

### Editing Metadata

1. **Click in any field** (Title, Description, or Tags)
2. **Type your content**
3. **Changes save automatically** as you type
4. **Validation happens in real-time**
   - Red text indicates errors
   - Fix errors before uploading

### Upload Queue Management

#### Viewing Your Queue
- See all files ready to upload
- Preview thumbnails
- Current status of each file

#### File Status Indicators
- **⏳ Waiting** (Gray): Ready to upload
- **⬆️ Uploading** (Blue): Upload in progress with progress bar
- **✅ Complete** (Green): Successfully uploaded
- **❌ Error** (Red): Upload failed with error message

#### Removing Files
- Click the **X icon** (X) on any file
- File is removed from queue (not uploaded)
- You can add it again if needed

### Starting the Upload

1. **Review Your Files**
   - Check all metadata is correct
   - Ensure no validation errors

2. **Click "Upload All" Button**
   - Located at the top of the queue panel
   - Button shows upload progress

3. **Watch Progress**
   - Progress bars show upload status
   - Percentage completion for each file
   - Toast notifications on success

4. **Upload Complete**
   - All files turn green
   - Success notification appears
   - Files remain in queue for reference

### During Upload

- **Don't close the browser tab**: Uploads will be interrupted
- **Don't navigate away**: Stay on the upload page
- **You can't add more files**: Wait for current upload to finish
- **Progress is shown**: Watch the progress bars

### After Upload

- **Success Notification**: "All photos uploaded successfully!"
- **View in Gallery**: Navigate to Gallery to see your images
- **Upload More**: Remove completed files and add new ones
- **Select Different Project**: Go back to Project Selection

---

## Managing Your Uploads

### Understanding File States

Throughout the upload process, files have different states:

1. **Waiting**
   - File is in queue but not uploaded yet
   - You can edit metadata
   - You can remove the file

2. **Uploading**
   - Upload is in progress
   - Progress bar shows percentage
   - Cannot edit or remove

3. **Complete**
   - Upload finished successfully
   - File is now in the gallery
   - Can remove from queue (can delete from gallery and only delete own photos)

4. **Error**
   - Upload failed
   - Error message shown in red
   - Can retry or remove

### Batch Operations

**Uploading Multiple Files:**
- All files in "Waiting" state upload together
- Upload happens sequentially (one at a time)
- Progress tracked individually

**Removing Multiple Files:**
- Remove files one by one
- Click trash icon on each file

### Validation Errors

If you see validation errors:

**Title too long:**
- Maximum 100 characters
- Shorten the title

**Description too long:**
- Maximum 500 characters
- Make description more concise

**Invalid characters:**
- Use only standard characters
- Avoid special symbols

### Upload Tips

1. **Prepare metadata beforehand**: Know your titles and descriptions
2. **Use consistent naming**: Follow a naming convention
3. **Add relevant tags**: Makes searching easier later
4. **Don't upload duplicates**: Check gallery first
5. **Compress large images**: Use online tools to reduce file size
6. **Batch similar images**: Upload related images together

---

## Viewing the Gallery

### Accessing the Gallery

- Click **"Gallery"** in the sidebar
- Or navigate to `/gallery` URL

### Gallery Layout

- **Grid View**: Images displayed in a responsive grid
- **Columns**: 1-4 columns depending on screen size
- **Cards**: Each image in its own card

### Image Cards

Each card shows:
- **Thumbnail**: Preview of the image
- **Title**: Image title
- **Description**: Brief description
- **Upload Date**: How long ago it was uploaded
- **Tags**: Associated keywords

### Interacting with Images

#### Desktop Experience

**Hover over an image:**
- Dark overlay appears
- View and Delete buttons appear
- Full information is visible

**Click "View" button (expand icon):**
- Opens image in lightbox
- Full-screen viewing experience

**Click "Delete" button (trash icon):**
- Confirmation dialog appears
- Confirms deletion
- Image removed from gallery

#### Mobile/Tablet Experience

**Tap an image:**
- Opens image in lightbox immediately
- Swipe left/right to navigate

**Long press:**
- Shows context menu
- Options to view or delete

### Lightbox Viewer

When viewing images full-screen:

**Navigation:**
- **Arrow Keys** (keyboard): Previous/Next image
- **Swipe** (touch): Swipe left/right to navigate
- **Arrow Buttons** (click): On-screen navigation

**Controls:**
- **Close Button (X)**: Exit lightbox
- **ESC Key**: Close lightbox
- **Zoom**: Pinch to zoom (mobile) or mouse wheel (desktop)

**Image Information:**
- Title displayed at bottom
- Description (if available)
- Navigation counter (e.g., "3 / 15")

### Filtering

#### Filter by Project
- Menu to select projects
- **Options**:
  - All Projects (default)
  - Specific project names
- Shows only images from selected project

#### Filter by Tags
- Click on any tag on an image
- Gallery filters to show images with that tag
- Clear filter to show all images again

### Sorting Options

Change how images are ordered:
- **Newest First** (default): Most recent uploads
- **Oldest First**: Earliest uploads

### Managing Your Images

#### Viewing Image Details
- Hover or tap on an image card
- See full information

#### Deleting Images
1. **Click the Delete button** (trash icon)
2. **Confirm deletion** in the modal
3. **Image is permanently deleted**
4. **Project photo count updates** automatically

**Note**: You can only delete images you uploaded. Admin can delete any image.

#### No Editing (Currently)
- Cannot edit title/description after upload
- Cannot change project
- Delete and re-upload if changes needed

---

## Tips & Best Practices

### Organizing Your Images

1. **Use Descriptive Titles**
   - Bad: "IMG_001.jpg"
   - Good: "Team Meeting January 2024"

2. **Write Meaningful Descriptions**
   - Include context, location, date
   - Mention people or events
   - Add relevant details for future reference

3. **Tag Consistently**
   - Use lowercase tags
   - Create a tagging system
   - Examples: location tags, event tags, people tags

4. **Select the Right Project**
   - Choose the most relevant project
   - Don't mix unrelated images in one project

### Optimizing Upload Performance

1. **Resize Large Images**
   - Use image editing software
   - Recommended: 1920x1080 or smaller
   - Reduces upload time

2. **Compress Images**
   - Use tools like TinyPNG or Squoosh
   - Maintains quality, reduces size
   - Faster uploads, less storage

3. **Upload in Batches**
   - Don't upload 100 images at once
   - Group into batches of 10-20
   - Easier to manage metadata

4. **Use Stable Internet**
   - Avoid uploading on slow/unstable connections
   - Large files need good connection
   - Consider waiting for better WiFi

### File Naming Conventions

**Before Uploading:**
- Rename files on your computer
- Use descriptive names
- Follow a pattern (e.g., "Event_Name_Date_001")

**Benefits:**
- Default title is the filename
- Easier to identify images
- Better organization

### Metadata Best Practices

**Titles:**
- Keep concise (under 50 characters ideal)
- Use title case
- Include key information

**Descriptions:**
- Add context others might not know
- Include dates, locations, people
- Make searchable

**Tags:**
- 3-7 tags per image
- Use existing tags when possible
- Create new tags sparingly
- Think about how you'll search later

### Security & Privacy

1. **Don't share login credentials**
2. **Log out on shared computers**
3. **Be mindful of sensitive images**
4. **Check project visibility before uploading**
5. **Remember: admins can see all images**

---

## Frequently Asked Questions

### General Questions

**Q: Can I upload videos?**
A: No, currently only image files are supported (JPEG, PNG, GIF).

**Q: Is there a limit to how many images I can upload?**
A: There's no hard limit, but browser LocalStorage has limits (~5-10MB total). Use smaller images or delete old ones if you reach the limit.

**Q: Can I download images from the gallery?**
A: Not directly through the UI currently. You can right-click and "Save Image As" in the lightbox.

**Q: Can I share a link to my gallery?**
A: Not currently. All images require login to view.

### Upload Questions

**Q: Why is my file rejected?**
A: Files are rejected if they:
- Exceed 5MB size limit
- Are not in supported format (JPEG, PNG, GIF)
- Solution: Compress or convert the file

**Q: Can I upload the same image twice?**
A: Yes, but it's not recommended. The system doesn't detect duplicates.

**Q: What happens if I close the browser during upload?**
A: The upload will be interrupted. Uploads are not resumed automatically. You'll need to upload again.

**Q: Can I change the order of files in the queue?**
A: No, files are uploaded in the order they were added.

**Q: Can I pause an upload?**
A: No, once started, uploads cannot be paused.

### Gallery Questions

**Q: Can I edit an image after uploading?**
A: No, you cannot edit title, description, or tags after upload. You must delete and re-upload.

**Q: Can I move an image to a different project?**
A: No, images are permanently associated with the project they were uploaded to.

**Q: Why can't I delete this image?**
A: You can only delete images you uploaded. If you don't see a delete button, the image was uploaded by someone else (only admins can delete others' images).

**Q: Can I see who uploaded an image?**
A: This information is stored but not currently displayed in the gallery. Admins can see uploader information.

**Q: Do deleted images go to trash first?**
A: No, deletion is permanent. There's a confirmation dialog to prevent accidental deletion.

### Project Questions

**Q: Can I create my own projects?**
A: No, only admins can create projects. Contact your administrator to request a new project.

**Q: Can I see images from all projects at once?**
A: Yes, in the Gallery, select "All Projects" from the project filter dropdown.

**Q: What if I can't find the project I need?**
A: Use the search bar on the Project Selection page, or contact your administrator.

### Account Questions

**Q: How do I change my password?**
A: Currently, password changes must be done by an administrator.

**Q: I forgot my password. How do I reset it?**
A: Contact your administrator to reset your password.

**Q: Can I have multiple accounts?**
A: Technically yes, but it's not recommended. Use one account per person.

**Q: How do I update my email?**
A: Contact your administrator to update your email address.

### Technical Questions

**Q: Which browsers are supported?**
A: Chrome, Firefox, Safari, and Edge (latest versions). Internet Explorer is not supported.

**Q: Can I use this on my phone?**
A: Yes! The application is fully responsive and works on mobile devices.

**Q: Why is the app slow?**
A: Possible reasons:
- Too many large images in LocalStorage
- Slow internet connection
- Old browser version
- Try clearing browser cache or using a different browser

**Q: Is my data backed up?**
A: Data is stored in browser LocalStorage only. It's not backed up automatically. If you clear browser data, it will be lost. Contact your administrator about backend storage.

**Q: Can I use this offline?**
A: No, an internet connection is required (even though data is stored locally).

### Troubleshooting

**Q: Images aren't appearing in the gallery**
A: Try:
- Refresh the page (Ctrl+R or Cmd+R)
- Check if upload was successful (look for success notification)
- Clear browser cache
- Check browser console for errors (F12)

**Q: Upload is stuck at a percentage**
A: 
- Wait a few minutes (large files take time)
- Check your internet connection
- If still stuck, refresh the page and try again

**Q: I see "QuotaExceededError"**
A:
- LocalStorage is full
- Delete old images you don't need
- Or clear browser LocalStorage (F12 → Application → Clear)
- Use smaller images

**Q: Gallery is empty but I uploaded images**
A:
- Make sure you're logged in with the same account
- Check if you selected the correct project
- Try filtering by "All Projects"
- Check browser console for errors

---

## Getting Help

### Need More Assistance?

1. **Check this User Guide**: Most questions are answered here
2. **Try the Application**: Experiment in a safe environment
3. **Ask Your Administrator**: They can help with account and project issues
4. **Check Browser Console**: F12 key, look for error messages
5. **Report Bugs**: Contact your administrator with:
   - What you were doing
   - What happened
   - Error messages (if any)
   - Browser and version

### Admin Contact

If you need to:
- Reset your password
- Update your account information
- Request a new project
- Report a bug or issue
- Request a new feature

Contact your system administrator.

---

## Quick Reference

### Login Credentials (Demo)
```
User: user1 / Password: user123 (active)
User: user2 / Password: user456 (inactive - can't login)
Admin: admin / Password: admin123 (active)
```

### Keyboard Shortcuts
- **ESC**: Close lightbox
- **← →**: Navigate images in lightbox
- **Ctrl+F**: Find on page (browser default)

### File Limits
- Max size: 5MB
- Formats: JPEG, PNG, GIF
- Max title: 100 characters
- Max description: 500 characters

### Common URLs
- User Login: `/login`
- Admin Login: `/admin/login`
- Project Selection: `/project-selection`
- Upload: `/image-upload`
- Gallery: `/gallery`

---

**Last Updated**: November 14, 2025
**Version**: 1.0.0

Thank you for using the Image Upload Management System! 📸
