import { NavLink } from 'react-router-dom';

function DashboardHeader() {
    return (
        <aside className="w-64 bg-gray-800 text-white p-6">
            <nav className="flex flex-col space-y-2 p-4 bg-gray-100">
                <NavLink to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white bg-blue-600 px-4 py-2 rounded"
                            : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink to="profile"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white bg-blue-600 px-4 py-2 rounded"
                            : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                    }
                >
                    Profile
                </NavLink>
                <NavLink to="settings"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white bg-blue-600 px-4 py-2 rounded"
                            : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                    }
                >
                    Settings
                </NavLink>
                <NavLink to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white bg-blue-600 px-4 py-2 rounded"
                            : "text-gray-700 hover:bg-gray-200 px-4 py-2 rounded"
                    }
                >
                    Home
                </NavLink>
            </nav>
        </aside>
    )
}

export default DashboardHeader;