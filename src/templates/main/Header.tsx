import { Link } from 'react-router-dom';
import { getUserRole } from '../../utils/auth';

function MainHeader() {
    const role = getUserRole();
    return (
        <header className="bg-blue-600 text-white p-4">
            <nav>
                <ul style={{ display: 'flex', listStyle: "none", padding: 0, margin: 0, gap: "20px" }}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    { role === 'admin' &&
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    }
                    {!role ?
                        <li><Link to="/login">Login</Link></li>
                        : <li><Link to="/logout">Logout</Link></li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;