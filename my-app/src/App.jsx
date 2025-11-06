import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AccountManagement from "./pages/admin/AccountManagement";
import ProjectManagement from "./pages/admin/ProjectManagement";
import AllPhoto from "./pages/admin/AllPhoto";
import Home from "./pages/user/Home";
import ProjectSelection from "./pages/user/ProjectSelection";
import ImageUpload from "./pages/user/ImageUpload";
import Gallery from "./pages/user/Gallery";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accounts" element={<AccountManagement />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="all-photos" element={<AllPhoto />} />
        </Route>

        {/* USER */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="project-selection" element={<ProjectSelection />} />
          <Route path="image-upload" element={<ImageUpload />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  );
}
export default App;