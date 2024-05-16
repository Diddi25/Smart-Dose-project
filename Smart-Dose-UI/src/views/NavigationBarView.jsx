import "../css/navigationbar.css";
import { useState, useEffect } from 'react';
import logo from '../images/logo3.png';
import { auth } from '../model/firebaseModel.js'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function setButtonTextCB() {
    const [signInOrOutText, setSignText] = useState('Sign in');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setSignText('My profile');
            } else {
                setSignText('Sign in');
            }
        });
    
        return () => unsubscribe();
    }, []);
    

    return signInOrOutText;
}
  
function signInACB() {
    const provider = new GoogleAuthProvider();
    if(!auth.currentUser) {
      console.log('The button text update is slow')
      signInWithPopup(auth, provider)
      console.log('Logged in')
    } else {
      window.location.href = "#/account"; 
    }
}


function NavigationBarView(props) {
    const [activeLink, setactiveLink] = useState("/");
    
    useEffect(() => {
        const handleHashChange = () => {
            setactiveLink(window.location.hash);
        }
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        }
    }, []);

    /*
    useEffect(()=> {
        const location = window.location.hash;
        setactiveLink(location)
    },[]);
*/
    function returnSignInButton() {
        return(
            <button className='signInButton'
                    onClick={signInACB}
                    id="signIn"
                    >
                    {setButtonTextCB()}
            </button>
        );
      }

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
                        {returnSignInButton()}
                    </li>
                </ul>
            </div>
        </div>
        </div> 
    );

}

export default NavigationBarView;