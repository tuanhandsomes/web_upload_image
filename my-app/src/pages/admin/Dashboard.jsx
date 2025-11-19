import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Users, Folder, Image, Database, Upload } from "lucide-react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { toast } from "react-toastify";

import { accountService } from "../../services/accountService";
import { projectService } from "../../services/projectService";
import { photoService } from "../../services/photoService";

// Hàm helper tính toán biểu đồ 
const getMonthlyChartData = (accounts, projects) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'
    ];

    // Khởi tạo mảng đếm 12 tháng
    const accountCounts = new Array(12).fill(0);
    const projectCounts = new Array(12).fill(0);

    // Đếm số tài khoản và dự án theo tháng
    accounts.forEach(acc => {
        const month = new Date(acc.createdAt).getMonth();
        accountCounts[month]++;
    });

    projects.forEach(proj => {
        const month = new Date(proj.createdAt).getMonth();
        projectCounts[month]++;
    });

    // Trả về dữ liệu biểu đồ
    return {
        categories: months,
        series: [
            { name: 'New Users', data: accountCounts },
            { name: 'New Projects', data: projectCounts }
        ]
    };
};

function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalUsers: 0,
        activeProjects: 0,
        totalPhotos: 0,
        storageUsed: 0
    });
    const [recentUploads, setRecentUploads] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/admin/login");
            return;
        }

        const loadDashboardData = async () => {
            setLoading(true);
            try {
                // 1. Gọi API song song
                const [accounts, projects, photos] = await Promise.all([
                    accountService.getAll(),
                    projectService.getAll(),
                    photoService.getAll()
                ]);

                // 2. Tính toán Stats
                // Cộng tổng fileSize của tất cả các ảnh
                const totalSizeBytes = photos.reduce((sum, photo) => sum + (Number(photo.fileSize) || 0), 0);

                // Chuyển đổi sang MB (1 MB = 1024 * 1024 bytes)
                const storageUsedMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);

                setStats({
                    totalUsers: accounts.filter(a => a.role === 'user').length,
                    activeProjects: projects.filter(p => p.status === 'active').length,
                    totalPhotos: photos.length,
                    storageUsed: storageUsedMB
                });

                // 3. Lấy 5 ảnh gần nhất
                const sortedPhotos = [...photos].sort((a, b) =>
                    new Date(b.uploadedAt) - new Date(a.uploadedAt)
                );
                setRecentUploads(sortedPhotos.slice(0, 5));

                // 4. Cấu hình Biểu đồ
                const chartData = getMonthlyChartData(accounts, projects);
                setChartOptions({
                    chart: { type: 'line' },
                    title: { text: 'Growth Statistics' },
                    xAxis: { categories: chartData.categories },
                    yAxis: { title: { text: 'Count' } },
                    plotOptions: {
                        line: { dataLabels: { enabled: true }, enableMouseTracking: true }
                    },
                    series: chartData.series
                });

            } catch (error) {
                console.error("Dashboard error:", error);
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [user, navigate]);

    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen animate-fadeIn">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">TOTAL USERS</p>
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading ? '...' : stats.totalUsers}
                    </h2>
                    <p className="text-sm text-gray-400">Registered users</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">ACTIVE PROJECTS</p>
                        <Folder className="w-5 h-5 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading ? '...' : stats.activeProjects}
                    </h2>
                    <p className="text-sm text-gray-400">Ongoing projects</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">TOTAL PHOTOS</p>
                        <Image className="w-5 h-5 text-yellow-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading ? '...' : stats.totalPhotos}
                    </h2>
                    <p className="text-sm text-gray-400">Uploaded photos</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">STORAGE USED</p>
                        <Database className="w-5 h-5 text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading ? '...' : `${stats.storageUsed} MB`}
                    </h2>
                    <p className="text-sm text-gray-400">Actual Image Size</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Overview</h3>
                    <div className="w-full">
                        {loading ? (
                            <div className="h-64 flex items-center justify-center text-gray-400">Loading chart...</div>
                        ) : (
                            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                        )}
                    </div>
                </div>

                {/* Recent Uploads */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Uploads</h3>
                        <button
                            onClick={() => navigate('/admin/all-photos')}
                            className="text-sm text-blue-500 hover:underline cursor-pointer"
                        >
                            View All
                        </button>
                    </div>
                    <ul className="space-y-4">
                        {loading ? (
                            <p className="text-gray-500 text-sm">Loading...</p>
                        ) : recentUploads.length === 0 ? (
                            <p className="text-gray-500 text-sm">No recent uploads.</p>
                        ) : (
                            recentUploads.map((photo) => (
                                <li key={photo.id} className="flex items-center gap-3 border-b border-gray-100 pb-2 last:border-0">
                                    <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                        <img
                                            src={photo.fileUrl}
                                            alt={photo.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-800 truncate" title={photo.title}>
                                            {photo.title}
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Upload className="w-3 h-3" />
                                            {new Date(photo.uploadedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* System Status */}
            <div className="mt-6 bg-white rounded-2xl shadow p-6 w-full lg:w-1/3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">System Health</h3>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                        <span>API Server</span>
                        <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">Online</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Database</span>
                        <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">Connected</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Disk Space</span>
                        <span className="text-blue-600 font-semibold">Healthy</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
