
import HardnessDataTable from "../data/hardnessData.js";
import DetergentDataTable from "../data/detergentData.js";
import { mainAlgoritm } from "../detergents/algorithm.js";

export default {
    /*properties that can be persisted*/
    HardnessData : HardnessDataTable, // const HardnessDataTable = [{Location: "Stockholm", Hardness: 3, ID: 199}]
    DetergentData : DetergentDataTable,
    user_location : {}, //innehåller .country .city .regionName || countryCode, region, zip, lat, lon, timezone, isp, org, as, query
    user_hardness : {Location: "Stockholm", Hardness: 5, ID: 199}, //{Location: , Hardness: , ID:}
    user_regionName_without_county : "undefined",
    user_white_detergent: {},
    user_color_detergent: {},
    user_added_detergents: {},
    scale_weight: 0,
    scale_status: false,
    selected_weight: null, // 1,5 / 4,5 / 6
    weight_choice: -1, // 0 == selected 1 == scale 
    sensor_weight: 0,
    dispenser_status : false,
    servomotor_option: 0, //0 == WHITE container 1 == COLOR container
    optimal_dosage: 0,
    selected_detergent: {},

    calculateOptimalDosage() {
        if (this.weight_choice === 1) {
            const weight_kg = this.selected_detergent/1000;
            this.optimal_dosage = mainAlgoritm(weight_kg, this.scale_weight, this.user_hardness);
        } else {
            this.optimal_dosage = mainAlgoritm(this.selected_detergent, this.selected_weight, this.user_hardness);
        };
    },



    setWeightChoice(choice){

        this.weight_choice=choice
    },
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
        };
        if (this.user_hardness === undefined) {
            this.setHardnessWithRegionName();
        };
        if(this.user_hardness === undefined) {
            this.setStockholmAsLocation();
        };
    },

    setHardnessWithRegionName() {
        const findRegionNameACB = hardnessTuple => {
            if (this.user_regionName_without_county === hardnessTuple.Location) {
                return hardnessTuple;
            };
        };
        const extractCounty = () => {
            function filterOutCountyACB(regionName) {
                return !(regionName === "county");
            };
            const regionName = this.user_location.regionName;
            let words = regionName.split(" ");
            words = words.filter(filterOutCountyACB);
            console.log(words, 'from', regionName); // Output: "Stockholm" from "Stockholm County"
            return words;
        };
        this.user_regionName_without_county = extractCounty();
        this.user_hardness = this.HardnessData.find(findRegionNameACB);
    },

    setStockholmAsLocation() {
        const findStockholmACB = hardnessTuple => {
            if (hardnessTuple.Location === "Stockholm") {
                return hardnessTuple;
            };
        };
        this.user_hardness = this.HardnessData.find(findStockholmACB);
    },

    setDetergentType(detergent_name) {
        const findDetergentACB = detergent => {
            if (detergent.name === detergent_name) {
                return detergent;
            };
        };
        this.selected_detergent = this.DetergentData.find(findDetergentACB)
        if(this.selected_detergent.type === 'white') {
            this.user_white_detergent = this.selected_detergent;
            console.log('white detergent selected', this.user_white_detergent)
        } else {
            this.user_color_detergent = this.selected_detergent;
            console.log('color detergent selected', this.user_color_detergent)
        };
    },

    removeUserWhiteDetergent() {
        this.user_white_detergent = null;
    },
    
    removeUserColorDetergent() {
        this.user_color_detergent = null;
    },

    setStatus(state){
        this.dispenser_status = state;
    },

    setScaleStatus(state){
        this.scale_status = state;
    },
    
    setScaleWeight(weight){
        this.scale_weight = weight;
        this.weight_choice = 1; //means the user wants to use scale weight
        console.log("new weight choice scale:", this.weight_choice);
    },

    setSelectedScaleWeight(manualWeight) {
        this.selected_weight = manualWeight;
        this.weight_choice = 0; //means the user wants to select the weight
        console.log("new weight choice select:", this.weight_choice);
    },

    setServomotor(option){
        this.servomotor_option = option;
    },
    
}