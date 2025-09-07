import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MainHeader() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate()
    return (
        <header className="bg-blue-600 text-white p-4">
            <nav>
                <ul style={{ display: 'flex', listStyle: "none", padding: 0, margin: 0, gap: "20px" }}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    {user?.role === 'subscriber' &&
                        <li><Link to="/user">User</Link></li>
                    }
                    {user?.role === 'admin' &&
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    }
                    {user?.role ?
                        <Link
                            to="/login"
                            onClick={(e) => {
                                e.preventDefault(); // stop immediate navigation
                                logout();
                                navigate("/login"); // redirect manually
                            }}
                        >
                            Logout
                        </Link>
                        : 
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                        
                    }
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;