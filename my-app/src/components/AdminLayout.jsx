import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";

import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 ">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
export default AdminLayout;