import { useState, useEffect } from "react";
import "../css/account.css";

function AccountView(props) {

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
                    User Location property: {props.location.city}
                    <br />
                    User Hardness property: {props.userHard.Location}
                    <h5>Water hardness</h5>
                </div>
            <div>
                <div className="profile-water">
                    <h6>Change your location</h6>
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
                <button>Log out</button>
            </div>
            <div>
                <button>Delete account</button>
            </div>
        </div>
    );
}

export default AccountView;
