
import { useState, useEffect } from "react";
import "../css/account.css";

function AccountView(props) {
    const [ipAddress, setIpAdderess] = useState('');
    const [geoInfo, setGeoInfo] = useState({});

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
            const response = await fetch('http://ip-api.com/json/130.229.182.157');
            const data = await response.json();
            setGeoInfo(data);
        } catch (error) {
            console.error('Failed to fetch location info:', error);
        }
    };

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
                <button>Fetch {fetchIPInfo}</button>
            </div>
            <div>
                <button>
                    Here:
                    {geoInfo.country && (
                        <div>
                            <strong>Country: </strong> {geoInfo.country}
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
