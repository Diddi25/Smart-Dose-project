import { useState, useEffect } from "react";
import "../css/account.css";
import { auth } from '../model/firebaseModel.js'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import Popup from "../components/Popup";

function AccountView(props) {

    const [activeButtonWater, setactiveButtonWater] = useState(" ");
    const [activeButtonRemoveW, setactiveButtonRemoveW] = useState(" ");
    const [activeButtonRemoveC, setactiveButtonRemoveC] = useState(" ");
    const [buttonPopupWhite, setButtonPopupWhite] = useState(false);
    const [buttonPopupColor, setButtonPopupColor] = useState(false);

    const buttonClickHandlerWater =(buttonID) =>{
        setactiveButtonWater(buttonID);
    }
    const buttonClickHandlerDetergent =(buttonID) =>{
        setactiveButtonDetergent(buttonID);
    }
    const buttonRemoveWhite =(buttonID) =>{
        setactiveButtonRemoveW(buttonID);
    }
    const buttonRemoveColor =(buttonID) =>{
        setactiveButtonRemoveC(buttonID);
    }  


    function logOutACB() {
        if(auth.currentUser) {
          signOut(auth)
          window.location.href = "#/"; 
          console.log('Logged out')
        }
    }

    function deleteAccount() {
        if(auth.currentUser) {
            if(window.confirm("Are you sure you want to permanently delete your account?")) {
                deleteUser(auth.currentUser)
                .then(() => {
                    console.log('Account deleted')
                    window.location.href = "#/"; 
                })
                .catch((error) => {
                    console.error('Error deleting account', error);
                });
            }
        }
    }

    function selectTypeChangeACB(evt) {
        props.selectLocationOption(evt.target.value);
    };

    function LocationShallNotBeUndefined(userHardnessObject) {
        if(userHardnessObject.Location) {
            return [userHardnessObject.Location, userHardnessObject.Hardness, "°dH"];
        } else {
            return "No internet connection";
        };
    };

    return (
        <div className="profile-container">
            <div>
                <title>My Profile</title>
            </div>
            <div className="profile-name">
                <h5>Welcome Diddi</h5>
                <p>{/*google account name*/}</p>
            </div>
                <div className="profile-title">
                    <h5>Water hardness</h5>
                </div>
            <div>
                <div className="profile-water">
                    <h6>Water hardness based on your location:</h6>
                    {props.userHard.Location && props.userHard.Location} {props.userHard.Hardness && props.userHard.Hardness}°dH
                </div>
                <div className="profile-water">
                    
                <select value={props.userHard.Location &&  props.userHard.Location || 'no side effect'} onChange={selectTypeChangeACB}>
                        <option value={props.userHard.Location &&  props.userHard.Location}>
                            {props.userHard.Location && props.userHard.Location || 'no side effect'} {props.userHard.Hardness && props.userHard.Hardness + '°dH' || ''}
                        </option>
                        {props.hardData.map( 
                            (someOption, index) => (
                                    <option key={index} value={someOption.Location && someOption.Location || 'no internet connection'}>
                                        {someOption.Location && someOption.Location || 'no internet connection'} {someOption.Hardness}°dH
                                    </option>)
                        )}                     
                </select>

                </div>
            </div>
            <div className="manual-waterhardness">
                        <h6>Choose water hardness manually</h6>
                        {/*Gränsvärden för hårdhet tagen ifrån https://sv.wikipedia.org/wiki/Vattenh%C3%A5rdhet 07052024 */}
                        <button id="soft" onClick={() => buttonClickHandlerWater("soft")} disabled={activeButtonWater ==="soft"}>SOFT 0-6°dH</button>
                        <button id="medium" onClick={() => buttonClickHandlerWater("medium")} disabled={activeButtonWater ==="medium"}>MEDIUM 7-13°dH</button>
                        <button id="hard" onClick={() => buttonClickHandlerWater("hard")} disabled={activeButtonWater ==="hard"}>HARD 14-20°dH</button>
            </div>
                    <br/>
                    <br/>
            <div className="profile-detergent">
                <h6>Recently used detergent types</h6>
                <div>
                    <div className="detergent-container">
                        <div className="detergent-WC">
                            <h6>WHITE</h6>
                            <div>
                                <button>Remove</button>
                                <div className="detergent-type" id="white" onClick={() => {buttonClickHandlerDetergent("white"); setButtonPopupWhite(true)}}>Coop white</div>
                                 {/* Saved white detergent */}
                            </div>
                        </div>
                        <div className="detergent-WC">
                            <h6>COLOR</h6>
                            <div>
                                <button>Remove</button>
                                <div className="detergent-type" id="color" onClick ={() => {buttonClickHandlerDetergent("color"); setButtonPopupColor(true)}}>Ariel color</div>
                                    {/* Saved colored detergent */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <br />
                <br />
                <br />
                <button onClick={logOutACB}>Log out</button>
            </div>
            <div>
                <button onClick={deleteAccount}>Delete account</button>
            </div>
            <Popup trigger={buttonPopupWhite} setTrigger = {setButtonPopupWhite} className="card"> 
            <div > 
                    WHITE DETERGENTS  <br/>  <br/>
                    Select a detergent 
                    <br/>
                    <br/>
        
                   <h6> Detergent 1  <br/> 
                    Detergent 2  </h6>
                    <br/>  

            </div>
        

            </Popup>

            <Popup trigger={buttonPopupColor} setTrigger = {setButtonPopupColor} className="card"> 
            <div >
                    COLOR DETERGENTS  <br/>  <br/>
                    
                    Select a detergent  
                    <br/>
                    <br/>
        
                   <h6> Detergent 1  <br/> 
                    Detergent 2  </h6>
                    <br/>  

            </div>
        

            </Popup>
        </div>
        
    );
}

export default AccountView;
