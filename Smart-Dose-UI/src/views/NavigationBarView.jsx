import "../css/navigationbar.css";
import { useState, useEffect } from 'react';
import logo from '../images/logo3.png';
import { auth } from '../model/firebaseModel.js'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function NavigationBarView(props) {
    const [activeLink, setactiveLink] = useState("/");
    const [signInOrOutText, setSignText] = useState('Sign in');
    
    useEffect(() => {
        const handleHashChange = () => {
            setactiveLink(window.location.hash);
        }
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setSignText('My profile');
                console.log("LOOOOOGGED IN!!!", signInOrOutText)
            } else {
                setSignText('Sign in');
                console.log("LOOOOOGGED OUUUUT!!!", signInOrOutText)
            }
        });
    
        return () => unsubscribe();
    }, []);

    function signInACB() {
        const provider = new GoogleAuthProvider();
        if(!auth.currentUser) {
          console.log('The button text update is slow')
          signInWithPopup(auth, provider)
           window.location.href = "#/account"; 
          console.log('Logged in')
        } else {
          window.location.href = "#/account"; 
        };
    };

    return (
        <div>
        <div className='navItems'>
            <div style={{activeLink}} >
                <ul>
                    <img 
                        src={logo} 
                        alt= "logo" 
                        className='logo'>
                    </img>
                    <li>
                        <a 
                            id="#/" 
                            className={activeLink === "#/" ? "active" : ""} 
                            onClick={()=>setactiveLink("#/")} 
                            href="#/">
                                Home
                        </a>
                    </li>
                    <li>
                        <a 
                            id="#/about" 
                            className={activeLink === "#/about" ? "active" : ""} 
                            onClick={()=>setactiveLink("#/about")} 
                            href="#/about">
                                About us
                        </a>
                    </li>
                    <li>
                        <a 
                            id="#/instuction" 
                            className={activeLink === "#/instruction" ? "active" : ""} 
                            onClick={()=>setactiveLink("#/instruction")} 
                            href="#/instruction">
                                Instruction
                        </a>
                    </li>
                    <li>
                        <a
                            className={activeLink === "#/account" ? "active" : ""} 
                            onClick={()=>{setactiveLink("#/account");signInACB();}}
                            id="#/account">
                                {signInOrOutText}  
                        </a>
                    
                    </li>
                </ul>
            </div>
        </div>
        </div> 
    );
}

export default NavigationBarView;