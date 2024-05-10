function calculateIcaDetergent(detergent, weight, waterHardness) {
    let lowerDosage, upperDosage, lowerWeight, upperWeight;

    if (weight <= 5) {
        lowerDosage = 0;
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["3-5kg"]);
        lowerWeight = 0;
        upperWeight = 5;
    } else if (weight <= 8) {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["3-5kg"]);
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["5-8kg"]);
        lowerWeight = 5;
        upperWeight = 8;
    } else {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["5-8kg"]);
        upperDosage = lowerDosage;
    }

    //TODO: Interpolate between the dosages based on the given weight
    let weightRatio = (weight - lowerWeight) / (upperWeight - lowerWeight);
    let exactDosage = lowerDosage + weightRatio * (upperDosage - lowerDosage);
    
    // debug
    //console.log("lower dosage:", lowerDosage);
    //console.log("upper dosage:", upperDosage);
    //console.log("weight interval:", weightInterval);
    //console.log("weight ratio:", weightRatio);

    //console.log("lower weight:", lowerWeight);
    //console.log("upper weight:", upperWeight);

    return `${exactDosage} ml`;
}

export { calculateIcaDetergent };
//const weight = 8; // kg
//const waterHardness = "Medium Water 8-14°dH";
//console.log("Recommended dosage:", calculateIcaDetergent(detergent, weight, waterHardness));