function calculateDetergent(detergent, weight, waterHardness) {
    let lowerDosage, upperDosage;

    if (weight <= 3) {
        lowerDosage = 0;
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["0-3kg"]);
    } else if (weight <= 6) {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["0-3kg"]);
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["4-6kg"]);
    } else if (weight <= 9) {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["4-6kg"]);
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["7-9kg"]);
    } else {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["7-9kg"]);
        upperDosage = lowerDosage;
    }

    // Interpolate between the dosages based on the given weight
    const lowerWeight = Math.floor(weight / 3) * 3;
    const upperWeight = Math.ceil(weight / 3) * 3;
    const exactDosage = lowerDosage + ((weight - lowerWeight) / (upperWeight - lowerWeight)) * (upperDosage - lowerDosage);

    return `${exactDosage} ml`;
}

// Example usage:
const detergent = {
    id: "ID",
    name: "Detergent Name",
    brand: "Brand Name",
    type: "color/White",
    weight: "1.9kg",
    articleNumber: "Article Number",
    dosageTable: {
        "Soft Water": {
            "0-3kg": "20 ml",
            "4-6kg": "50 ml",
            "7-9kg": "75 ml"
        },
        "Medium Water": {
            "0-3kg": "30 ml",
            "4-6kg": "70 ml",
            "7-9kg": "105 ml"
        },
        "Hard Water": {
            "0-3kg": "40 ml",
            "4-6kg": "80 ml",
            "7-9kg": "120 ml"
        }
    }
};

const weight = 6; // kg
const waterHardness = "Medium Water";
console.log("Recommended dosage:", calculateDetergent(detergent, weight, waterHardness));