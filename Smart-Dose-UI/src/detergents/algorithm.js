import { calculateIcaDetergent } from "./algorithms/Ica.js";
import { calculateAplusDetergent } from "./algorithms/Aplus.js";
import { calculateIcaBasicDetergent } from "./algorithms/IcaBasic.js";
import { calculateIcaSkonaDetergent } from "./algorithms/IcaSkona.js";
import { calculateViaDetergent } from "./algorithms/Via.js";


function mainAlgoritm(detergent, weight, hardness) {
    const waterHardness = hardnessToString(hardness);
    const weightFactor = calculateFactor(detergent.dosage);


    switch(detergent.brand.toLowerCase()) {
        // Case algoritm för ica
        case 'ica':
            return calculateIcaDetergent(detergent, weight, waterHardness, weightFactor );
        // Case algoritm för A+ 
        case 'a+':
            return calculateAplusDetergent(detergent, weight, waterHardness, weightFactor);
        // Case algoritm för Ica Basic
        case 'ica basic':
            return calculateIcaBasicDetergent(detergent, weight, waterHardness, weightFactor);
        // Case algoritm för Ica Skona
        case 'ica skona':
            return calculateIcaSkonaDetergent(detergent, weight, waterHardness, weightFactor);
        // Case algoritm för Via    
        case 'via':
            return calculateViaDetergent(detergent, weight, waterHardness, weightFactor);
        //test

        default:
            return "Ingen hantering för det angivna varumärket.";
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



// TEST
const testDetergent = {
    "id": "11",
            "name": "A+ Sensitive Color pulver 700g",
            "brand": "ICA",
            "link": "https://www.kontorsgiganten.se/a-sensitive-color-pulver-700g-p-50",
            "type": "color",
            "weight": "0.7kg",
            "dosage": "39ml = 33g",
            "articleNumber": "?",
            "dosageTable": {
                "Soft Water <8°dH": {
                    "3-4kg": "39 ml",
                    "5-7kg": "67 ml",
                    "8+kg": "89 ml"
                },
                "Medium Water 8-14°dH": {
                    "3-4kg": "50 ml",
                    "5-7kg": "85 ml",
                    "8+kg": "114 ml"
                },
                "Hard Water >14°dH": {
                    "3-4kg": "62 ml",
                    "5-7kg": "106 ml",
                    "8+kg": "141 ml"
                }
    }
};

const wH = {
    "Location": "Alingsås",
    "Hardness": 1,
    "ID": 2
  };

const testWeight = 7;


console.log("Recommended dosage:", mainAlgoritm(testDetergent, testWeight, wH));