import { calculateIcaDetergent } from "./algorithms/Ica.js";

function mainAlgoritm(detergent, weight, hardness) {
    const waterHardness = hardnessToString(hardness);

    switch(detergent.brand.toLowerCase()) {
        // Case algoritm för ica
        case 'ica':
            return calculateIcaDetergent(detergent, weight, waterHardness );
        // Case algoritm för A+ 
        case 'a+':
            return Aplus.calculateDetergent(detergent, weight, waterHardness);
        // Case algoritm för Ica Basic
        case 'icabasic':
            return IcaBasic.calculateDetergent(detergent, weight, waterHardness);
        // Case algoritm för Ica Skona
        case 'icaskona':
            return IcaSkona.calculateDetergent(detergent, weight, waterHardness);
        // Case algoritm för Via    
        case 'Via':
            return Via.calculateDetergent(detergent, weight, waterHardness);
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

// TEST
const testDetergent = {
    "id": 1,
    "name": "Kulörtvättmedel Parfymfri Ekologisk 750ml ICA Skona",
    "brand": "ICA",
    "link": "https://handla.ica.se/produkt/2042652",
    "type": "color",
    "dosage": "100ml = 82g",
    "articleNumber": "?",
    "dosageTable": {
        "Soft Water <8°dH": { //ml
            "3-5kg": 39,
            "5-8kg": 65
        },
        "Medium Water 8-14°dH": {
            "3-5kg": 45,
            "5-8kg": 75
        },
        "Hard Water >14°dH": {
            "3-5kg": 60,
            "5-8kg": 100
        }
    }
};

const wH = {
    "Location": "Alingsås",
    "Hardness": 1,
    "ID": 2
  };

const testWeight = 5;

console.log("Recommended dosage:", mainAlgoritm(testDetergent, testWeight, wH));