import { useState, useEffect } from "react";
import "../css/account.css";
import { auth } from '../model/firebaseModel.js'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { deleteUser } from "firebase/auth";

function AccountView(props) {
      
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
                    <h6>Change your location</h6>
                </div>
                <div className="profile-water">
                    
                <select value={props.userLocation || ''} onChange={selectTypeChangeACB}>
                    <option value={props.userLocation || ''}>Change location...</option>
                        {props.hard && props.hard.map( 
                            (someOption, index) => (
                                    <option key={index} value={someOption.Location}>{someOption.Location} {someOption.Hardness}°dH</option>)
                        )}                     

                </select>

                </div>
            </div>
                <div className="profile-detergent">
                    <h6>Recently used detergent types</h6>
                    <div>
                        <div className="detergent-container">
                            <div className="detergent-WC">
                                <h6>WHITE</h6>
                            <div>
                                <button>Remove</button>
                                <div className="detergent-type">Coop white</div>
                                {/* Saved white detergent */}
                            </div>

                            </div>
                            <div className="detergent-WC">
                                <h6>COLOR</h6>
                            <div>
                                <button>Remove</button>
                                <div className="detergent-type">Ariel color</div>
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
        </div>
    );
}

export default AccountView;
