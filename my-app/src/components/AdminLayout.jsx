import { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-[#223771]">

            {/* Truyền state và hàm set xuống Header */}
            <Header
                onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            <div className="flex flex-1 overflow-hidden pl-4 **pt-4 pb-4**">

                {/*Truyền state xuống Sidebar */}
                <Sidebar
                    isMobileMenuOpen={isMobileMenuOpen}
                    onMenuClose={() => setIsMobileMenuOpen(false)}
                />

                {/* Khối nội dung */}
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
