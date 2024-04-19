import { Link } from 'react-router-dom';
import "../css/navigationbar.css";

function NavigationBarView(props) {
    function mainPageACB() {
        window.location.hash="#/"
    }
    function aboutUsPageACB() {
        window.location.hash="#/about"
    }
    function instructionPageACB() {
        window.location.hash="#/instruction"
    }
    function accountPageACB() {
        window.location.hash="#/account"
    }
    return (
        <div>
            <button onClick={mainPageACB} className='navItems'>Home</button>
            <button onClick={aboutUsPageACB} className='navItems'>About us</button>
            <button onClick={instructionPageACB} className='navItems'>Instruction</button>
            <button onClick={accountPageACB} className='loginButton'>Login</button>
        </div>
    );

}

export default NavigationBarView;