import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Users, Folder, Image, Database, Upload } from "lucide-react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getData } from "../../utils/storage";
import { toast } from "react-toastify";

const getMonthlyChartData = (accounts, projects) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'
    ];

    const accountCounts = new Array(12).fill(0);
    const projectCounts = new Array(12).fill(0);

    // Đếm số lượng account tạo theo tháng
    accounts.forEach(acc => {
        const month = new Date(acc.createdAt).getMonth(); // 0 = Jan, 1 = Feb
        accountCounts[month]++;
    });

    // Đếm số lượng project tạo theo tháng
    projects.forEach(proj => {
        const month = new Date(proj.createdAt).getMonth();
        projectCounts[month]++;
    });

    return {
        categories: months,
        series: [
            {
                name: 'New Users',
                data: accountCounts
            },
            {
                name: 'New Projects',
                data: projectCounts
            }
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
        if (!user) navigate("/admin/login");
        try {
            // Lấy dữ liệu đồng bộ từ localStorage
            const accounts = getData('accounts', []);
            const projects = getData('projects', []);
            const photos = getData('photos', []);

            // Tính toán Stats từ localStorage
            const storageSize = new Blob([JSON.stringify(photos)]).size;
            const storageMB = (storageSize / (1024 * 1024)).toFixed(2); // (Đơn vị MB)

            setStats({
                totalUsers: accounts.filter(a => a.role === 'user').length, // Chỉ đếm 'user'
                activeProjects: projects.filter(p => p.status === 'active').length,
                totalPhotos: photos.length,
                storageUsed: storageMB
            });

            // Lấy 8 ảnh upload gần nhất từ localStorage
            const sortedPhotos = [...photos].sort((a, b) =>
                new Date(b.uploadedAt) - new Date(a.uploadedAt)
            );
            setRecentUploads(sortedPhotos.slice(0, 8));

            // Chuẩn bị dữ liệu cho Biểu đồ Thống Kê
            const chartData = getMonthlyChartData(accounts, projects);
            setChartOptions({
                chart: { type: 'line' },
                title: { text: 'New Users & Projects Growth' },
                xAxis: { categories: chartData.categories },
                yAxis: { title: { text: 'Count' } },
                plotOptions: {
                    line: {
                        dataLabels: { enabled: true },
                        enableMouseTracking: false
                    }
                },
                series: chartData.series
            });

        } catch (err) {
            toast.error("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    }, [user, navigate]);

    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen animate-fadeIn">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">TOTAL USERS</p>
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading ? '...' : stats.totalUsers}
                    </h2>
                    <p className="text-sm text-gray-400">Total registered users</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">ACTIVE PROJECTS</p>
                        <Folder className="w-5 h-5 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading ? '...' : stats.activeProjects}
                    </h2>
                    <p className="text-sm text-gray-400">Projects currently active</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">TOTAL PHOTOS</p>
                        <Image className="w-5 h-5 text-yellow-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading ? '...' : stats.totalPhotos}
                    </h2>
                    <p className="text-sm text-gray-400">Total photos uploaded</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">STORAGE USED</p>
                        <Database className="w-5 h-5 text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading ? '...' : `${stats.storageUsed} MB`}
                    </h2>
                    <p className="text-sm text-gray-400">Actual (LocalStorage)</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Growth (YTD)</h3>
                    <div className="w-full">
                        {loading ? (
                            <div className="text-center p-10 text-gray-500">Loading chart...</div>
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
                            <p className="text-gray-500">Loading uploads...</p>
                        ) : recentUploads.length === 0 ? (
                            <p className="text-gray-500">No recent uploads found.</p>
                        ) : (
                            recentUploads.map((photo) => (
                                <li key={photo.id} className="flex items-center gap-3">
                                    <img src={photo.fileUrl} alt={photo.title} className="w-10 h-10 rounded-md object-cover" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 truncate w-48">{photo.title}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(photo.uploadedAt).toLocaleString()}
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
                <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><span>Server Status</span><span className="text-green-600 font-semibold">Online</span></li>
                    <li className="flex justify-between"><span>Database (LocalStorage)</span><span className="text-green-600 font-semibold">Healthy</span></li>
                    <li className="flex justify-between"><span>Storage Used (Actual)</span><span className="text-blue-600 font-semibold">{loading ? '...' : `${stats.storageUsed} MB`}</span></li>
                </ul>
            </div>
        </div>
    );
}


export default Dashboard;
