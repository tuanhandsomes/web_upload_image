# 🚀 Setup Instructions - Image Upload Management System

Complete step-by-step guide to set up and run the application on your local machine.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Guide](#installation-guide)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Building for Production](#building-for-production)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Setup](#advanced-setup)

---

## System Requirements

### Minimum Requirements

- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB free space for dependencies
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Recommended Tools

- **Code Editor**: Visual Studio Code (with extensions)
- **Git**: For version control (optional but recommended)
- **Terminal**: Command Prompt, PowerShell, Terminal, or iTerm2

### Check Your System

Run these commands to verify your system:

```bash
# Check Node.js version
node --version
# Should output: v18.0.0 or higher

# Check npm version
npm --version
# Should output: 9.0.0 or higher

# Check if Git is installed (optional)
git --version
```

If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Choose LTS (Long Term Support) version
- Run the installer and follow instructions

---

## Installation Guide

### Step 1: Get the Project Files

#### Option A: Clone from Git (Recommended)

```bash
# Clone the repository
git clone https://github.com/tuanhandsomes/web_upload_image.git

# Navigate to the project folder
cd web_upload_image/my-app
```

#### Option B: Download ZIP

1. Go to: https://github.com/tuanhandsomes/web_upload_image
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal/command prompt
5. Navigate to the extracted folder:

```bash
cd path/to/reactjs_upload_image_project/my-app
```

**Windows Example:**
```bash
cd C:\Users\YourName\Downloads\reactjs_upload_image_project\my-app
```

**Mac/Linux Example:**
```bash
cd ~/Downloads/reactjs_upload_image_project/my-app
```

### Step 2: Install Dependencies

This step downloads all required packages (React, Vite, TailwindCSS, etc.)

```bash
# Using npm (recommended)
npm install

# Or using yarn (if you prefer)
yarn install
```

**What happens:**
- Creates `node_modules` folder (contains all packages)
- Creates `package-lock.json` (locks dependency versions)
- Downloads ~200-300MB of files
- Takes 2-5 minutes depending on internet speed

**Expected output:**
```
added 245 packages, and audited 246 packages in 2m

42 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Step 3: Verify Installation

Check if everything is installed correctly:

```bash
# List installed packages
npm list --depth=0

# Expected major packages:
# ├── react@19.1.1
# ├── react-dom@19.1.1
# ├── react-router-dom@6.30.1
# ├── vite@7.1.7
# └── ... (more packages)
```

---

## Configuration

### Default Configuration

The application comes pre-configured and ready to use. No configuration changes are needed for basic usage.

### Configuration Files

#### 1. `package.json`
Contains project metadata and dependencies.

```json
{
  "name": "my-app",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": { ... }
}
```

#### 2. `vite.config.js`
Vite build tool configuration.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

#### 3. `eslint.config.js`
Code quality and style checking.

```javascript
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '19.1' } },
    plugins: { react },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  },
]
```

### Customizing Configuration

#### Change Development Port

Edit `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000,  // Change from default 5173 to 3000
    open: true,  // Auto-open browser
  },
  plugins: [react(), tailwindcss()],
})
```

#### Change Base URL for Production

If deploying to a subdirectory:

```javascript
export default defineConfig({
  base: '/my-app/',  // For example: https://example.com/my-app/
  plugins: [react(), tailwindcss()],
})
```

### Environment Variables (Optional)

Create `.env` file in the root directory:

```env
# .env
VITE_APP_NAME=Image Upload System
VITE_API_URL=http://localhost:3000/api
```

Access in code:
```javascript
const appName = import.meta.env.VITE_APP_NAME
```

**Note:** The current version uses LocalStorage, so API URL is not needed yet.

---

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

**What happens:**
1. Vite starts development server
2. Application compiles
3. Server runs on `http://localhost:5173`
4. Terminal shows:

```
  VITE v7.1.7  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Accessing the Application

1. **Open your browser**
2. **Navigate to**: `http://localhost:5173`
3. **You'll see the login page**

### Available URLs

- **User Login**: `http://localhost:5173/login`
- **Admin Login**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin/dashboard` (after admin login)
- **Project Selection**: `http://localhost:5173/project-selection` (after user login)

### Default Test Accounts

#### Regular Users:
```
Username: user1  | Password: user123
Username: user2  | Password: user456
Username: user3  | Password: user789
```

#### Administrator:
```
Username: admin  | Password: admin123
```

### Development Features

While running in development mode, you get:

1. **Hot Module Replacement (HMR)**
   - Changes reflect instantly without full page reload
   - Edit code and see results immediately

2. **Error Overlay**
   - Syntax errors show in the browser
   - Stack traces for debugging

3. **Source Maps**
   - Original source code in browser DevTools
   - Easy debugging

4. **Fast Refresh**
   - React components update without losing state

### Stopping the Server

- Press `Ctrl + C` in the terminal
- Or close the terminal window

---

## Building for Production

### Create Production Build

```bash
npm run build
```

**What happens:**
1. Code is bundled and optimized
2. Output goes to `dist/` folder
3. JavaScript and CSS are minified
4. Images and assets are optimized
5. Source maps are generated (optional)

**Build output:**
```
vite v7.1.7 building for production...
✓ 234 modules transformed.
dist/index.html                   0.45 kB │ gzip: 0.31 kB
dist/assets/index-a1b2c3d4.css    45.2 kB │ gzip: 12.1 kB
dist/assets/index-e5f6g7h8.js    234.5 kB │ gzip: 78.3 kB
✓ built in 5.43s
```

### Preview Production Build

```bash
npm run preview
```

This starts a local server serving the production build:

```
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
```

### Build Output Structure

```
dist/
├── index.html                 # Entry HTML file
├── assets/
│   ├── index-[hash].js       # Main JavaScript bundle
│   ├── index-[hash].css      # Main CSS bundle
│   └── [images]              # Optimized images
└── favicon.ico               # Favicon (if present)
```

### Build Optimization

The production build includes:

- **Minification**: Removes whitespace, shortens variable names
- **Tree Shaking**: Removes unused code
- **Code Splitting**: Splits into smaller chunks for faster loading
- **Compression**: Gzip compression for smaller file sizes
- **Asset Optimization**: Images and fonts optimized

### Build Size Analysis (Optional)

To analyze bundle size:

```bash
# Install analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true })
  ],
})

# Build
npm run build
```

This opens an interactive chart showing what's included in your bundle.

---

## Deployment

### Static Hosting (Recommended)

Since this is a React SPA (Single Page Application), you can deploy to any static hosting service.

#### Option 1: Vercel (Easiest)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd my-app
vercel
```

3. **Follow prompts:**
   - Link to your Vercel account
   - Configure project settings
   - Deploy

4. **Get your URL:**
   - Example: `https://my-app-abc123.vercel.app`

#### Option 2: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build your app:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

4. **Get your URL:**
   - Example: `https://my-app-abc123.netlify.app`

#### Option 3: GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json:**
```json
{
  "homepage": "https://yourusername.github.io/my-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js:**
```javascript
export default defineConfig({
  base: '/my-app/',  // Repository name
  plugins: [react(), tailwindcss()],
})
```

4. **Deploy:**
```bash
npm run deploy
```

### Server Configuration

For proper SPA routing, configure your server to redirect all requests to `index.html`.

#### Apache (.htaccess)

Create `.htaccess` in your `dist` folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx

Add to your Nginx config:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Environment-Specific Builds

#### Development
```bash
npm run dev
```
- Source maps
- Verbose error messages
- HMR enabled

#### Production
```bash
npm run build
```
- Minified code
- Optimized assets
- No source maps (optional)

---

## Troubleshooting

### Common Installation Issues

#### Issue: `npm install` fails

**Error:** `npm ERR! code EACCES` or `EPERM`

**Solution:**
```bash
# Windows: Run as Administrator
# Mac/Linux: Use sudo
sudo npm install

# Or fix permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

#### Issue: Port already in use

**Error:** `Port 5173 is already in use`

**Solution:**
```bash
# Option 1: Kill the process
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9

# Option 2: Use different port
# Edit vite.config.js (see Configuration section)
```

#### Issue: Module not found

**Error:** `Cannot find module 'react'`

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Common Runtime Issues

#### Issue: White screen after deployment

**Solution:**
1. Check browser console for errors (F12)
2. Verify `base` path in `vite.config.js`
3. Check server routing configuration
4. Ensure `dist` folder is deployed correctly

#### Issue: Routes return 404

**Solution:**
1. Configure server for SPA (see Deployment section)
2. Check `react-router-dom` is installed
3. Verify routes in `App.jsx`

#### Issue: LocalStorage full

**Error:** `QuotaExceededError`

**Solution:**
```javascript
// Clear LocalStorage in browser console
localStorage.clear()

// Or programmatically
localStorage.removeItem('accounts')
localStorage.removeItem('projects')
localStorage.removeItem('photos')
```

### Build Issues

#### Issue: Build fails with errors

**Solution:**
```bash
# Check for ESLint errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Clear cache
rm -rf node_modules/.vite
npm run build
```

#### Issue: Out of memory during build

**Solution:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Development Issues

#### Issue: Changes not reflecting

**Solution:**
1. Check if dev server is running
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache
4. Restart dev server

#### Issue: Slow HMR

**Solution:**
1. Reduce number of dependencies
2. Update to latest Vite version
3. Check for file system watchers limit (Linux):
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## Advanced Setup

### VS Code Setup (Recommended)

#### Required Extensions:
1. **ES7+ React/Redux/React-Native snippets**
2. **ESLint**
3. **Prettier**
4. **Tailwind CSS IntelliSense**
5. **Auto Rename Tag**
6. **Path Intellisense**

#### Workspace Settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*=\\s*['\"`]([^'\"`]*)['\"`]", "['\"`]([^'\"`]*)['\"`]"]
  ]
}
```

### Git Setup

#### Initialize Git:
```bash
git init
```

#### Recommended `.gitignore`:

```
# Dependencies
node_modules/

# Production build
dist/
build/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Cache
.cache/
.vite/
```

### Docker Setup (Optional)

#### Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Build and Run:

```bash
# Build image
docker build -t my-image-app .

# Run container
docker run -p 8080:80 my-image-app
```

### Performance Monitoring

#### Install Lighthouse:

```bash
npm install -g lighthouse
```

#### Run Audit:

```bash
lighthouse http://localhost:5173 --view
```

This generates a performance report with:
- Performance score
- Accessibility score
- Best practices
- SEO score

### Testing Setup (Future)

#### Install Jest and React Testing Library:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

#### Add test script to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

## Checklist

### Before Starting Development:
- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Project files downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server runs successfully (`npm run dev`)
- [ ] Application loads in browser
- [ ] Can log in with test credentials

### Before Deploying:
- [ ] Build succeeds (`npm run build`)
- [ ] Production preview works (`npm run preview`)
- [ ] All routes work correctly
- [ ] No console errors
- [ ] Images load correctly
- [ ] Tested on multiple browsers
- [ ] Mobile responsive
- [ ] Server configuration done (for SPA routing)

### After Deployment:
- [ ] Application accessible via URL
- [ ] All routes work (no 404s)
- [ ] Login works
- [ ] Upload works
- [ ] Gallery works
- [ ] Check browser console for errors
- [ ] Test on mobile devices

---

## Getting Help

### Resources:
- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
- **TailwindCSS**: https://tailwindcss.com/
- **React Router**: https://reactrouter.com/

### Support:
- GitHub Issues: https://github.com/tuanhandsomes/web_upload_image/issues
- Check browser console (F12) for errors
- Review this documentation thoroughly

---

**Last Updated**: November 14, 2025
**Version**: 1.0.0
**Maintainer**: tuanhandsomes

Happy coding hehe^^
