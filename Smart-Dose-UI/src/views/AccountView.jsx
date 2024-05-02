import { useState, useEffect } from "react";
import "../css/account.css";


function AccountView(props) {
    const [ipAddress, setIpAdderess] = useState("");
    const [geoInfo, setGeoInfo] = useState({});
    const [showFlag, setShowFlag] = useState("0");
    const [fetchflag, setFetchFlag] = useState("0");
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

    useEffect(() => {
        getVisitorIP();
    }, []);

    const getVisitorIP = async () => {
        try {
            const response = await fetch("https://api.ipify.org");
            const data = await response.text();
            setIpAdderess(data);
        } catch (error) {
            console.error("Failed to fetch IP:", error);
        }
    };

    const fetchIPInfo = async () => {
        try {
            const url = "http://ip-api.com/json/" + ipAddress;
            const response = await fetch(url);
            const data = await response.json();
            setGeoInfo(data);
        } catch (error) {
            console.error("Failed to fetch location info:", error);
        }
    };

    function showGeoInfo() {
        if (showFlag === "0") {
            fetchIPInfo();
            setShowFlag("1");
        } else {
            setGeoInfo({});
            setShowFlag("0");
        }
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
                    <select id="">
                    <option>Test</option>
                    <option>1</option>
                    
                    </select>
                </div>
            </div>
            <div className="manual-waterhardness">
                        <h6>Choose water hardness manually</h6>
                     
                        <button id="hard" onClick={() => buttonClickHandlerWater("hard")} disabled={activeButtonWater ==="hard"}>HARD</button>
                        <button id="medium" onClick={() => buttonClickHandlerWater("medium")} disabled={activeButtonWater ==="medium"}>MEDIUM</button>
                        <button id="soft" onClick={() => buttonClickHandlerWater("soft")} disabled={activeButtonWater ==="soft"}>SOFT</button>
                    </div>
                    <br/>
                    <br/>
                <div className="profile-detergent">
                    <h6>Recently used detergent types</h6>
                    <div>
                        <div className="detergent-container">
                            <div className="detergent-WC">
                                <h6>WHITE</h6>
                            <div className="remove-button">
                                <button id="remove-white" onClick={() => buttonRemoveWhite("remove-white")} disabled={activeButtonRemoveW ==="remove-white"}>Remove</button>
                                <div className="detergent-type">Coop white</div>
                                {/* Saved white detergent */}
                            </div>

                            </div>
                            <div className="detergent-WC">
                                <h6>COLOR</h6>
                            <div className="remove-button">
                            <button id="remove-color" onClick={() => buttonRemoveColor("remove-color")} disabled={activeButtonRemoveC ==="remove-color"}>Remove</button>
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
