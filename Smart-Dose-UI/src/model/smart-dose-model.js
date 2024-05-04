import HardnessDataTable from "../data/hardnessData.js"
import { observer } from "mobx-react-lite";

export default {
    /*properties that can be persisted*/

    HardnessData : HardnessDataTable, // const HardnessDataTable = [{Location: "Stockholm", Hardness: 3, ID: 34}]
    user_location : {}, //innehåller .country .city .regionName || countryCode, region, zip, lat, lon, timezone, isp, org, as, query
    user_hardness : {}, //{Location: , Hardness: , ID:}
    user_regionName_without_county : "",
    status : false,

    changeUserHardness(location) { //here comes the string
        const findCityACB = hardnessTuple => {
            if (hardnessTuple.Location === location) {
                return hardnessTuple;
            }
        };
        this.user_hardness = this.HardnessData.find(findCityACB);
    },

    setUserHardness() {
        const findCityACB = hardnessTuple => {
            if (hardnessTuple.Location === this.user_location.city) {
                return hardnessTuple;
            }
        };
        this.user_hardness = this.HardnessData.find(findCityACB);
        if (this.user_hardness === undefined) {
            this.setHardnessWithRegionName();
        }
    },

    setHardnessWithRegionName() {
        const findRegionNameACB = hardnessTuple => {
            if (this.user_regionName_without_county === hardnessTuple.Location) {
                return hardnessTuple;
            }
        };
        const extractCounty = () => {
            const regionName = this.user_location.regionName;
            const words = regionName.split(" ");
            const desiredWord = words[0];
            console.log(desiredWord, 'from', regionName); // Output: "Stockholm" from "Stockholm County"
            return desiredWord;
        };
        this.user_regionName_without_county = extractCounty();
        this.user_hardness = this.HardnessData.find(findRegionNameACB)
    },

    setSatus(state){
        this.status = state;
    },
    
}