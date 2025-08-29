import { Outlet } from 'react-router-dom';
import MainHeader from '../main/Header';
import MainFooder from '../main/Footer';

export function MainLayout() {
    return (
        <div>
            <MainHeader />
            <main>
                <Outlet />  {/* nested routes render here */}
            </main>
            <MainFooder />
        </div>
    );
}

export default MainLayout;