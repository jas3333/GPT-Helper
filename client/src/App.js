import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Conversations from './pages/Conversations';
import Home from './pages/Home';

function App() {
    const [chatResponse, setChatResponse] = useState([]);
    return (
        <div className='container '>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home chatResponse={chatResponse} setChatResponse={setChatResponse} />} />
                    <Route
                        path='/conversations'
                        element={<Conversations setChatResponse={setChatResponse} chatResponse={chatResponse} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
