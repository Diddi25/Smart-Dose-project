import { Link } from 'react-router-dom';
import "../css/navigationbar.css";
import { useState, useEffect } from 'react';
import logo from '../images/logo3.png';

function NavigationBarView(props) {
    /*Activates link when pressed and compares the id to the location.hash 
        results in that the nav bar is highlited on the page im currently at */
    const [activeLink, setactiveLink] = useState("/");
    
    useEffect(()=> {
        const location = window.location.hash;
        setactiveLink(location)
    },[])

    return (
        <div>
        <div className='navItems'>
        <div style={{activeLink}} >
            <ul>
            <img src={logo} alt= "logo" className='logo'></img>
                <li><a id="#/" className={activeLink === "#/" ? "active" : ""} onClick={()=>setactiveLink("#/")} href="#/">Home</a></li>
                <li><a id="#/about" className={activeLink === "#/about" ? "active" : ""} onClick={()=>setactiveLink("#/about")} href="#/about">About us</a></li>
                <li><a id="#/instuction" className={activeLink === "#/instruction" ? "active" : ""} onClick={()=>setactiveLink("#/instruction")} href="#/instruction">Instruction</a></li>
                <li className="loginButton"><a id="#/account" className={activeLink === "#/account" ? "active" : ""}onClick={()=>setactiveLink("#/account")} href="#/account">Login</a></li>
            </ul>
        </div>
        </div>
        </div> 
    );

}

export default NavigationBarView;