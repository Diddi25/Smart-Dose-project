import HardnessDataTable from "../data/hardnessData.js"

export default {
    /*properties that can be persisted*/

    //hardnessData : [{Location:'Ale', Hardness: 3, ID: 1}, {Location: 'Alingsåddds', Hardness:1, ID: 2}],
    HardnessData : HardnessDataTable,
    user_location : {}, //innehåller .country .city .regionName || countryCode, region, zip, lat, lon, timezone, isp, org, as, query
    status : false,

    setUserLocation(location) {
        this.location = location;
    },

    setSatus(state){
        this.status = state;
    },
    
}