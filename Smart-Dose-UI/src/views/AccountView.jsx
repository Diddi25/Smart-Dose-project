import { useState, useEffect } from "react";
import "../css/account.css";
import { auth } from '../model/firebaseModel.js'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { deleteUser } from "firebase/auth";

function AccountView(props) {

    const [activeButtonWater, setactiveButtonWater] = useState(" ");
    const [activeButtonRemoveW, setactiveButtonRemoveW] = useState(" ");
    const [activeButtonRemoveC, setactiveButtonRemoveC] = useState(" ");

    const buttonClickHandlerWater =(buttonID) =>{
        setactiveButtonWater(buttonID);
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
    }

    return (
        <div className="profile-container">
            <div className="header">
            <header >Welcome {auth.currentUser ? auth.currentUser.displayName : 'Guest'}</header >
                <p>{/*google account name*/}</p>
            </div>
            <div className="card-container">
            <div className="card">
                <div className="profile-title">
                    <h5>Water hardness</h5>
                </div>
                <br />
                <br />
                <br />
            <div>
                <div className="profile-water">
                    <h6>Water hardness based on your location:</h6>
                    {props.userHard.Location} {props.userHard.Hardness}°dH
                </div>
                <div className="profile-water">
                    
                <select value={props.userHard.Location} onChange={selectTypeChangeACB}>
                    <option value={props.userHard.Location}>{props.userHard.Location} {props.userHard.Hardness}°dH</option>
                        {props.hardData.map( 
                            (someOption, index) => (
                                    <option key={index} value={someOption.Location}>{someOption.Location} {someOption.Hardness}°dH</option>)
                        )}                     
                </select>

                </div>
            </div>
            <div className="manual-waterhardness">
                        <h6>Choose water hardness manually</h6>
                     
                        <button id="hard" onClick={() => buttonClickHandlerWater("hard")} disabled={activeButtonWater ==="hard"}>HARD</button>
                        <button id="medium" onClick={() => buttonClickHandlerWater("medium")} disabled={activeButtonWater ==="medium"}>MEDIUM</button>
                        <button id="soft" onClick={() => buttonClickHandlerWater("soft")} disabled={activeButtonWater ==="soft"}>SOFT</button>
            </div>
            </div>
            <div className="card">
            <div className="profile-detergent">
            <div className="profile-title">
                <h5>Recently used detergent types</h5>
            </div>   
                <div>
                    <div className="detergent-container">
                        <div className="detergent-WC">
                            <h6>WHITE</h6>
                            <div>
                                <button className="remove-button">Remove</button>
                                <div className="detergent-type">Coop white</div>
                                 {/* Saved white detergent */}
                            </div>
                        </div>
                        <div className="detergent-WC">
                            <h6>COLOR</h6>
                            <div>
                            <button className="remove-button">Remove</button>
                                <div className="detergent-type">Ariel color</div>
                                    {/* Saved colored detergent */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            <div>
                <button className="button-style" onClick={logOutACB}>Log out</button>
                <button className="button-style" onClick={deleteAccount}>Delete account</button>
            </div>
        </div>
    );
}

export default AccountView;

