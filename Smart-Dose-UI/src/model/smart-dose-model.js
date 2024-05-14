import { observer } from "mobx-react-lite";
import firebaseObject from "../backupTrash/firebaseObject.js"
import HardnessDataTable from "../data/hardnessData.js"
import DetergentDataTable from "../data/detergentData.js"

export default {
    /*properties that can be persisted*/

    HardnessData : HardnessDataTable, // const HardnessDataTable = [{Location: "Stockholm", Hardness: 3, ID: 199}]
    DetergentData : DetergentDataTable,
    user_location : {}, //innehåller .country .city .regionName || countryCode, region, zip, lat, lon, timezone, isp, org, as, query
    user_hardness : {}, //{Location: , Hardness: , ID:}
    user_regionName_without_county : "undefined",
    user_added_detergents: {},
    user_detergent: 'WHITE',
    dispenser_status : true,
    scale_weight: 0,
    selected_weight: null,
    sensor_weight: 0,
    servomotor_option: 0, //0 == WHITE container 1 == COLOR container
    optimal_dosage: 0, 

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
        if(this.user_hardness.Location === undefined) {
            this.user_hardness = this.HardnessData.find(findCityACB);
        }
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
            function filterOutCountyACB(regionName) {
                return !(regionName === "county");
            }
            const regionName = this.user_location.regionName;
            let words = regionName.split(" ");
            words = words.filter(filterOutCountyACB)
            console.log(words, 'from', regionName); // Output: "Stockholm" from "Stockholm County"
            return words;
        };
        this.user_regionName_without_county = extractCounty();
        this.user_hardness = this.HardnessData.find(findRegionNameACB)
    },

    setStatus(state){
        this.dispenser_status = state;
    },

    setScaleStatus(state){
        this.scaleStatus = state
    },
    
    setScaleWeight(weight){
        this.scaleWeight = weight;
    },

    setServomotor(option){
        this.servomotor_option = option;
    },
    

    

    
}