import { useState, useEffect } from "react";
import "../css/account.css";
import { auth } from '../model/firebaseModel.js'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import Popup from "../components/popup";

function AccountView(props) {

    const [activeButtonWater, setactiveButtonWater] = useState(" ");
    const [activeButtonRemoveW, setactiveButtonRemoveW] = useState(" ");
    const [activeButtonRemoveC, setactiveButtonRemoveC] = useState(" ");
    const [buttonPopupWhite, setButtonPopupWhite] = useState(false);
    const [buttonPopupColor, setButtonPopupColor] = useState(false);

    const buttonClickHandlerWater =(buttonID) =>{
        setactiveButtonWater(buttonID);
    };
    const buttonRemoveWhite =() =>{
        props.removeWhiteDetergent();
    };
    const buttonRemoveColor =() =>{
        props.removeColorDetergent();
    } ;
    function logOutACB() {
        if(auth.currentUser) {
          signOut(auth)
          window.location.href = "#/"; 
          window.location.reload();
          console.log('Logged out');
        }
    };
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
            };
        };
    };
    function selectTypeChangeACB(evt) {
        props.selectLocationOption(evt.target.value);
    };
    function selectDetergentACB(evt) {
        props.selectDetergentType(evt.target.value);
        console.log(evt.target);
    };
    function filterWhiteDetergentsACB(detergent) {
        if(detergent.type === 'white') {
            return detergent;
        }
    };
    function filterColorDetergentsACB(detergent) {
        if(detergent.type === 'color') {
            return detergent;
        }
    };

    return (
        <div className="profile-container">
            <div className="header-2">
                <header >Welcome {auth.currentUser ? auth.currentUser.displayName : 'Guest'}</header >
                <p>{/*google account name*/}</p>
            </div>
            <div className="card-container">
                <div className="card-profile">
                    <div className="profile-title">
                        <h5>Water hardness</h5>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div>
                        <div className="profile-water">
                            <h6>Water hardness based on your location:</h6>
                            {props.userHard.Location && props.userHard.Location} {props.userHard.Hardness && props.userHard.Hardness}°dH
                        </div>
                        <div className="profile-water">   
                            <select value={props.userHard.Location} onChange={selectTypeChangeACB}>
                                <option value={props.userHard.Location}>{props.userHard.Location} {props.userHard.Hardness}°dH</option>
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
                        <button id="soft" 
                            onClick={() => buttonClickHandlerWater("soft")} 
                            disabled={activeButtonWater ==="soft"}>SOFT 0-6°dH</button>
                        <button id="medium" 
                            onClick={() => buttonClickHandlerWater("medium")} 
                            disabled={activeButtonWater ==="medium"}>MEDIUM 7-13°dH</button>
                        <button id="hard" 
                            onClick={() => buttonClickHandlerWater("hard")} 
                            disabled={activeButtonWater ==="hard"}>HARD 14-20°dH</button>
                    </div>
                </div>
                <div className="card-profile">
                    <div className="profile-detergent">
                        <div className="profile-title">
                            <h5>Recently used detergent types</h5>
                        </div>   
                        <div>
                            <div className="detergent-container">
                                <div className="detergent-WC">
                                    <h6>WHITE</h6>
                                    <div>
                                        <button className="remove-button" onClick={buttonRemoveWhite}>
                                            Remove
                                        </button>
                                        <div className="detergent-type" 
                                            id="white" 
                                            onClick={() => { setButtonPopupWhite(true)}}>
                                            {props.userWhiteDetergent?.name || 'not chosen yet' }
                                        </div>
                                    </div>
                                </div>
                                <div className="detergent-WC">
                                    <h6>COLOR</h6>
                                    <div>
                                        <button className="remove-button" onClick={buttonRemoveColor}>
                                            Remove
                                        </button>
                                        <div className="detergent-type" 
                                            id="color" 
                                            onClick ={() => {setButtonPopupColor(true)}}>
                                            {props.userColorDetergent?.name || 'not chosen yet' }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popup trigger={buttonPopupWhite} setTrigger = {setButtonPopupWhite} className="card"> 
                <div > 
                    WHITE DETERGENTS <br />
                    Select a detergent <br />
                    <br />
                    <br />
                    <select className="dropdown" 
                                value={props.userWhiteDetergent && props.userWhiteDetergent.name ? props.userWhiteDetergent.name : 'not chosen yet'} 
                                onChange={selectDetergentACB}>
                            <option value={'not chosen yet'}>
                                Choose white detergent...
                            </option>
                            {props.detergentData.filter(filterWhiteDetergentsACB).map( 
                                (detergent, id) => (
                                    <option key={id} value={detergent.name && detergent.name || 'error in data'}>
                                        {detergent.name && detergent.name || 'error in data'}
                                    </option>)
                            )}                     
                    </select>
                </div>
            </Popup>
            <Popup trigger={buttonPopupColor} setTrigger = {setButtonPopupColor} className="card"> 
                <div >
                    COLOR DETERGENTS  <br />
                    Select a detergent <br />
                    <br />
                    <br />
                    <select className="dropdown" 
                            value={props.userColorDetergent && props.userColorDetergent.name ? props.userColorDetergent.name : 'not chosen yet'} 
                            onChange={selectDetergentACB}>
                            <option value={'not chosen yet'}>
                                Choose color detergent...
                            </option>
                            {props.detergentData.filter(filterColorDetergentsACB).map( 
                                (detergent, id) => (
                                    <option key={id} value={detergent.name && detergent.name || 'error in data'}>
                                        {detergent.name && detergent.name || 'error in data'}
                                    </option>)
                            )}                     
                    </select>
                </div>
            </Popup>
            <div>
                <button className="button-style" onClick={logOutACB}>Log out</button>
                <button className="button-style" onClick={deleteAccount}>Delete account</button>
            </div>
        </div>
    );
}

export default AccountView;

