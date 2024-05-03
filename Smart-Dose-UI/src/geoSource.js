
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
