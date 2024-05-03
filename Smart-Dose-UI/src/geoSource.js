
export async function fetchLocation() {
    try {
        const ipAddress = await fetchIpAdress();
        const url = "http://ip-api.com/json/" + ipAddress;
        const response = await fetch(url);
        const geoInfo = response.json();
        return geoInfo;
    } catch (error) {
        console.error("Failed to fetch location info:", error);
    }
}

async function fetchIpAdress() {
    try {
        const response = await fetch("https://api.ipify.org");
        const ip = response.text();
        return ip;
    } catch (error) {
        console.error("Failed to fetch IP:", error);
    }
}


export function fetchLocation2() {
    try {
        const ipAddress = fetchIpAdress();
        const url = "http://ip-api.com/json/" + ipAddress;
        const response = fetch(url);
        const geoInfo = response.json();
        return geoInfo;
        return 
    } catch (error) {
        console.error("Failed to fetch location info:", error);
    }
}

function fetchIpAdress2() {
    try {
        const response = fetch("https://api.ipify.org");
        const ip = response.text();
        return ip;
    } catch (error) {
        console.error("Failed to fetch IP:", error);
    }
}



export function fetchLocation3() {
    return fetchIpAddress()
        .then(ipAddress => {
            const url = "http://ip-api.com/json/" + ipAddress;
            return fetch(url);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch location info");
            }
            return response.json();
        })
        .catch(error => {
            console.error("Failed to fetch location info:", error);
            throw error; // Re-throw the error for the caller to handle
        });
}

function fetchIpAddress3() {
    return fetch("https://api.ipify.org")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch IP address");
            }
            return response.text();
        })
        .catch(error => {
            console.error("Failed to fetch IP address:", error);
            throw error; // Re-throw the error for the caller to handle
        });
}

/*
    const [ipAddress, setIpAdderess] = useState("");
    const [geoInfo, setGeoInfo] = useState({});
    const [showFlag, setShowFlag] = useState("0");
    const [fetchflag, setFetchFlag] = useState("0");

    useEffect(() => {
        getVisitorIP();
    }, []);

    const getVisitorIP = async () => 
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
*/