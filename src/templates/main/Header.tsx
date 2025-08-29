import { Link } from 'react-router-dom';

function MainHeader() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/shop">Shop</Link> | <Link to="/dashboard">Dashboard</Link>
            </nav>
        </header>
    )
}

export default MainHeader;