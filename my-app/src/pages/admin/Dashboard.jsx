import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Users, Folder, Image, Database, Upload } from "lucide-react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/admin/login");
    }, [user, navigate]);

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'User Participation Chart'
        },
        subtitle: {
            text: 'Source: ' +
                '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
                'target="_blank">Account Management</a>'
        },
        xAxis: {
            categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                'Oct', 'Nov', 'Dec'
            ]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'user',
            data: [
                16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
                22.0, 17.8
            ]
        }]
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">TOTAL USERS</p>
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">2,847</h2>
                    <p className="text-sm text-green-600">+12.5% from last month</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">ACTIVE PROJECTS</p>
                        <Folder className="w-5 h-5 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">184</h2>
                    <p className="text-sm text-green-600">+8.2% from last month</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">TOTAL PHOTOS</p>
                        <Image className="w-5 h-5 text-yellow-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">45.2K</h2>
                    <p className="text-sm text-green-600">+2.4% from last month</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">STORAGE USED</p>
                        <Database className="w-5 h-5 text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">287 GB</h2>
                    <p className="text-sm text-red-500">+15.3% from last month</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">User Activity</h3>
                        <span className="text-sm text-gray-500">Last 30 days</span>
                    </div>
                    <div className="w-full">
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </div>
                </div>

                {/* Recent Uploads */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Uploads</h3>
                        <button className="text-sm text-blue-500 hover:underline">View All</button>
                    </div>
                    <ul className="space-y-4">
                        {[
                            { name: "banner-homepage.jpg", author: "Đỗ Tuấn", time: "2 min ago" },
                            { name: "header-homepage.png", author: "Đỗ Tuấn", time: "15 min ago" },
                            { name: "admin-sidebar.jpg", author: "Đỗ Tuấn", time: "1 hour ago" },
                            { name: "admin-sidebar.jpg", author: "Đỗ Tuấn", time: "1 hour ago" },
                            { name: "admin-sidebar.jpg", author: "Đỗ Tuấn", time: "1 hour ago" },
                            { name: "admin-sidebar.jpg", author: "Đỗ Tuấn", time: "1 hour ago" },
                            { name: "admin-sidebar.jpg", author: "Đỗ Tuấn", time: "1 hour ago" },
                            { name: "admin-sidebar.jpg", author: "Đỗ Tuấn", time: "1 hour ago" },
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <Upload className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                    <p className="text-xs text-gray-500">
                                        By {item.author} • {item.time}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* System Status */}
            <div className="mt-6 bg-white rounded-2xl shadow p-6 w-full lg:w-1/3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><span>Server Status</span><span className="text-green-600 font-semibold">Online</span></li>
                    <li className="flex justify-between"><span>Database</span><span className="text-green-600 font-semibold">Healthy</span></li>
                    <li className="flex justify-between"><span>Storage</span><span className="text-blue-600 font-semibold">75% Used</span></li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
