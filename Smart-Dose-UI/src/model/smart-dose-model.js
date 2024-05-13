import { observer } from "mobx-react-lite";
import firebaseObject from "../backupTrash/firebaseObject.js";
import HardnessDataTable from "../data/hardnessData.js";
import DetergentDataTable from "../data/detergentData.js";
import { getDosageTable } from "../algoritm.js";
import { getDosageConversion } from "../algoritm.js";
import { getWeightRanges } from "../algoritm.js";
import { getDosageInLiter } from "../algoritm.js";
import { convertToGram } from "../algoritm.js";

export default {
    /*properties that can be persisted*/

    HardnessData : HardnessDataTable, // const HardnessDataTable = [{Location: "Stockholm", Hardness: 3, ID: 199}]
    DetergentData : DetergentDataTable,
    user_location : {}, //innehåller .country .city .regionName || countryCode, region, zip, lat, lon, timezone, isp, org, as, query
    user_hardness : {}, //{Location: , Hardness: , ID:}
    user_regionName_without_county : "undefined",
    user_white_detergent: {},
    user_color_detergent: {},
    user_added_detergents: {},
    detergent_choice: 0, // 0 == white 1 == color
    scale_weight: 0,
    scale_status: true,

    selected_weight: null, // 1,5 / 4,5 / 6
    weight_choice: 0, // 0 == selected 1 == scale 
    sensor_weight: 0,
    dispenser_status : true,
    servomotor_option: 0, //0 == WHITE container 1 == COLOR container
    optimal_dosage: 0, 

    calculateOptimalDosage() {
        let relevantDosageTable = {}; //behöver detergentChoice, whiteDetergent, colorDetergent
        let relevantWeightRange = {};
        let dosageConversion = ""; //detergentChoice whiteDetergent, colorDetergent
        let literDosage = "";

        relevantDosageTable = getDosageTable(this.detergent_choice, this.user_white_detergent, this.user_color_detergent);
        dosageConversion = getDosageConversion(this.detergent_choice, this.user_white_detergent, this.user_color_detergent);
        relevantWeightRange = getWeightRanges(this.user_hardness.Hardness, relevantDosageTable);
        if(this.weight_choice == 0) {
            literDosage = getDosageInLiter(this.selected_weight, relevantWeightRange)
        } else {
            literDosage = getDosageInLiter(this.scale_weight, relevantWeightRange)
        }

        this.optimal_dosage = convertToGram(dosageConversion, literDosage); //convertToGram /// dosageConversion, literDosage
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

    setDetergentType(detergent_name) {
        const findDetergentACB = detergent => {
            if (detergent.name === detergent_name) {
                return detergent;
            }
        };
        const foundDetergent = this.DetergentData.find(findDetergentACB)
        if(foundDetergent.type === 'white') {
            this.user_white_detergent = foundDetergent;
            this.detergent_choice = 0; //user wants to use white
        } else {
            this.user_color_detergent = foundDetergent;
            this.detergent_choice = 1; //user wants to use color
        }
    },

    setStatus(state){
        this.dispenser_status = state;
    },

    setScaleStatus(state){
        this.scale_status = state
    },
    
    setScaleWeight(weight){
        this.scale_weight = weight;
    },

    setSelectedScaleWeight(manualWeight) {
        this.selected_weight = manualWeight;
        this.weight_choice = 0; //means the user wants to select weight
    },
    

    
}