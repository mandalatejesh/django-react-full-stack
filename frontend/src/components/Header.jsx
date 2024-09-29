import '../styles/header.css';

import Profile from '../components/Profile';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const navigate = useNavigate();
    return <header className="header">
        {props.showProfile && <Profile/> }
        <button className="ask-button" onClick={() => {
            navigate('/ask');
        }}>Ask a question</button>
    </header>
}

export default Header;