import "../css/navigationbar.css";
import { useState, useEffect } from 'react';
import logo from '../images/logo3.png';
import { auth } from '../model/firebaseModel.js'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function setButtonTextCB() {
    const [signInOrOutText, setSignText] = useState('Sign in');

    useEffect(() => {
      if (auth.currentUser) {
        setSignText('Logged in as ' + auth.currentUser.displayName);
      } else {
        setSignText('Sign in')
      }
    }, [auth.currentUser, signInOrOutText]);
  
    return signInOrOutText;
}
  
function signInACB() {
    const provider = new GoogleAuthProvider();
    if(auth.currentUser) {
      signOut(auth) 
      window.location.reload();
      console.log('logged out')
    } else {
      console.log('The button text update is slow')
      signInWithPopup(auth, provider)
      console.log('Logged in')
    }
}

function NavigationBarView(props) {
    /*Activates link when pressed and compares the id to the location.hash 
        results in that the nav bar is highlited on the page im currently at */
    const [activeLink, setactiveLink] = useState("/");
    
    useEffect(()=> {
        const location = window.location.hash;
        setactiveLink(location)
    },[]);

    function returnSignInButton() {
        return(
          <div className="singInContainer">
            <button className='signInButton'
                    onClick={signInACB}
                    id="signIn"
                    >{setButtonTextCB()}
                    {/*console.log("The error from clicking on signin button is ok")*/}
            </button>
          </div>
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
                        <a 
                            id="#/test" 
                            className={activeLink === "#/test" ? "active" : ""} 
                            onClick={()=>setactiveLink("#/test")} 
                            href="#/test">
                                Test yta
                        </a></li>
                    <li className="loginButton">
                        <a 
                            id="#/account" 
                            className={activeLink === "#/account" ? "active" : ""} 
                            onClick={()=>setactiveLink("#/account")} 
                            href="#/account">
                                Login
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>{returnSignInButton()}</li>
                </ul>
            </div>
        </div>
        </div> 
    );

}

export default NavigationBarView;