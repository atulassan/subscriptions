import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

//Private Route
const PrivateRoute = lazy(()=>import("../routes/PrivateRoute"))

// Lazy load all route components
const MainLayout = lazy(() => import("../templates/layout/MainLayout"));
const DashboardLayout = lazy(() => import("../templates/layout/DashboardLayout"));

const Home = lazy(() => import("../pages/main/Home"));
const About = lazy(() => import('../pages/main/About'));
const Contact = lazy(() => import('../pages/main/Contact'));
const Shop = lazy(() => import('../pages/main/Shop'));
const Login = lazy(() => import('../pages/main/Login'));
const UnAuthorized = lazy(() => import('../pages/main/UnAuthorized'));
const User = lazy(() => import('../pages/main/User'));
const Register = lazy(() => import('../pages/main/Register'));

const Dashboard = lazy(()=> import("../pages/dashboard/Dashboard"))
const Profile = lazy(() => import("../pages/dashboard/Profile"));
const Settings = lazy(() => import('../pages/dashboard/Settings'));

// Loading fallback component
const Loader = () => <div className="p-4 text-center">Loading...</div>;


function Approutes(){
    return(
        <>
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                { /* Public Routes*/}
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} /> {/* Default Home page */}
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="login" element={<Login />} />
                        <Route path="user" element={<User />} />
                        <Route path="register" element={<Register />} />
                        <Route path="unauthorized" element={<UnAuthorized />} />
                    </Route>
                    <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route index element={<Dashboard />} /> {/* Default dashboard page */}
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
        </>
    )
}

export default Approutes;
