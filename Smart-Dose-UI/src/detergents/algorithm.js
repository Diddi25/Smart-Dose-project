import { calculateIcaDetergent } from "./algorithms/Ica.js";
import { calculateAplusDetergent } from "./algorithms/Aplus.js";
import { calculateIcaBasicDetergent } from "./algorithms/IcaBasic.js";
import { calculateIcaSkonaDetergent } from "./algorithms/IcaSkona.js";
import { calculateViaDetergent } from "./algorithms/Via.js";
import { calculateDefaultDetergent } from "./algorithms/Default.js";


function mainAlgoritm(detergent, weight, hardness) {
    const waterHardness = hardnessToString(hardness);
    const weightFactor = calculateFactor(detergent.dosage);


    switch(detergent.brand.toLowerCase()) {
        // Case algoritm For Ica
        case 'ica':
            return calculateIcaDetergent(detergent, weight, waterHardness, weightFactor );
        // Case algoritm for A+ 
        case 'a+':
            return calculateAplusDetergent(detergent, weight, waterHardness, weightFactor);
        // Case algoritm for Ica Basic
        case 'ica basic':
            return calculateIcaBasicDetergent(detergent, weight, waterHardness, weightFactor);
        // Case algoritm for Ica Skona
        case 'ica skona':
            return calculateIcaSkonaDetergent(detergent, weight, waterHardness, weightFactor);
        // Case algoritm for Via    
        case 'via':
            return calculateViaDetergent(detergent, weight, waterHardness, weightFactor);
        // Default case
        default:
            return calculateDefaultDetergent(detergent, weight, waterHardness, weightFactor);
    }
}

function hardnessToString(hardness){
    if (hardness.Hardness < 8){
        return "Soft Water <8°dH"; 
    } else if (hardness.Hardness <=14){
        return "Medium Water 8-14°dH"
    } else {
        return "Hard Water >14°dH"
    }
}

function calculateFactor(factorInfo){
    let dosageString = factorInfo;

    let parts = dosageString.split("=");

    let milliliters = parseFloat(parts[0]);
    let grams = parseFloat(parts[1]);

    let factor = grams / milliliters;
    
    return factor;
}

export { mainAlgoritm };

// TEST
const testDetergent = {
    "id": 13,
    "name": "Tvättmedel White 700g A+",
    "brand": "A+",
    "link": "https://www.mathem.se/se/products/8588-a-tvattmedel-white-700g-a/?gad_source=1&gclid=Cj0KCQjwltKxBhDMARIsAG8KnqVci2FgDX1tk9_-JYC4Vv_7ja4dMuUsfw8S3bcb9NYJga0piau8RLoaAp05EALw_wcB",
    "type": "white",
    "weight": "0.7kg",
    "dosage": "39ml = 33g",
    "articleNumber": "?",
    "dosageTable": {
        "Soft Water <8°dH": {
            "3-4kg": 39,
            "5-7kg": 67,
            "8+kg": 89
        },
        "Medium Water 8-14°dH": {
            "3-4kg": 50,
            "5-7kg": 85,
            "8+kg": 114
        },
        "Hard Water >14°dH": {
            "3-4kg": 62,
            "5-7kg": 106,
            "8+kg": 141
        }
    }
};

const wH = {
    "Location": "Alingsås",
    "Hardness": 1,
    "ID": 2
  };

const testWeight = 6;


console.log("Recommended dosage:", mainAlgoritm(testDetergent, testWeight, wH));