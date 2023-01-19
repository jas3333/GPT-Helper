import { FaCog } from 'react-icons/fa';

const Navbar = ({ setShowSettings, showSettings }) => {
    return (
        <nav className='navbar'>
            <FaCog className='icon auto-right mg-right-lg pointer' onClick={() => setShowSettings(!showSettings)} />
        </nav>
    );
};

export default Navbar;
