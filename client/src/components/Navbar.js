import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [showSettings, setShowSettings] = useState(true);
    return (
        <nav className='navbar'>
            <div className='container mg-left mg-right-lg align'>
                <Link className='nav-links mg-right-lg' to='/'>
                    Home
                </Link>
                <Link className='nav-links mg-right-lg' to='/conversations'>
                    Conversations
                </Link>
                <FaCog className='icon pointer' />
            </div>
        </nav>
    );
};

export default Navbar;
