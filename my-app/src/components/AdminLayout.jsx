import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";

import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex flex-col h-screen bg-[#223771]">
            <Header />
            <div className="flex flex-1 overflow-hidden pl-4 **pt-4 pb-4** gap-4">
                <Sidebar />
                <div className="flex flex-col flex-1 rounded-tl-3xl rounded-bl-3xl overflow-hidden bg-gradient-to-br from-white to-indigo-50">
                    <main className="flex-1 overflow-y-auto p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default AdminLayout;