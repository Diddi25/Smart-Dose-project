
import { useState, useEffect } from "react";
import "../css/account.css";

function AccountView(props) {
    const [ipAddress, setIpAdderess] = useState('');
    const [geoInfo, setGeoInfo] = useState({});
    const [showFlag, setShowFlag] = useState('0');
    const [fetchflag, setFetchFlag] = useState('0');
    const [geoFlag, setflag] = useState('0');
    const [seconfglad, setsecondflag] = useState('0');

    useEffect(() => {
        getVisitorIP();
    }, []);

    const getVisitorIP = async () => {
        try {
            const response = await fetch('https://api.ipify.org');
            const data = await response.text();
            setIpAdderess(data);
        } catch (error) {
            console.error('Failed to fetch IP:', error);
        }
    }

    const fetchIPInfo = async () => {
        try {
            const url = 'http://ip-api.com/json/' + ipAddress;
            const response = await fetch(url);
            const url = ('http://ip-api.com/json/' + ipAddress);
            const response = await fetch(url);
            const data = await response.json();
            setGeoInfo(data);
        } catch (error) {
            console.error('Failed to fetch location info:', error);
        }
    };

    function showGeoInfo() {
        if(showFlag === '0') {
            fetchIPInfo();
            setShowFlag('1');
        } else {
            setGeoInfo({});
            setShowFlag('0');
        }
    }

    function showgeoInfo() {
        if(geoFlag === '0') {
            fetchIPInfo();
            setflag('1');
        } else {
            setGeoInfo({});
            setflag('0');
        }
    }

    return (
        <div>
            <div>
                <title>
                    My Profile
                </title>
            </div>
            <div>
                <h5>Welcome Diddi</h5>
                <p>{/*google account name*/}</p>
            </div>
            <div>
                <button>Min ip adress: {ipAddress}</button>
                <button onClick={showGeoInfo}>Fetch</button>
                <button onClick={showgeoInfo}>Fetch </button>
            </div>
            <div>
                <button>
                    Here:
                    {geoInfo.country && (
                        <div>
                            <strong>Country: </strong> {geoInfo.country}
                            <br />
                            <strong>City: </strong> {geoInfo.city}
                            <br />
                            <strong>Region: </strong> {geoInfo.regionName}
                            <br />
                            <strong>City: </strong> {geoInfo.city}
                            <br />
                            <strong>RegionName: </strong> {geoInfo.regionName}
                        </div>
                    )}
                </button>
            </div>
            <div>
                <h6>
                    Water hardness
                </h6>
                <select value="Stockholm 4-6 dH" id=""></select>    
            </div>
            <div>
                <h6>
                    Recently used detergent types
                </h6>
                <h6>
                    WHITE
                </h6>
                <button>Remove</button>
                <div>
                    {/* Saved white detergent */}
                </div>
                <h6>
                    COLOR
                </h6>
                <button>Remove</button>
                <div>
                    {/* Saved colored detergent */}
                </div>
            </div>
            <div>
                <br />
                <br />
                <br />
                <button>
                    Log out
                </button>
            </div>
            <div>
                <button>
                    Delete account
                </button>
            </div>
        </div>
    );
}

export default AccountView;
