function calculateViaDetergent(detergent, weight, waterHardness, weightFactor) {
    let lowerDosage, upperDosage, lowerWeight, upperWeight;

    if (weight <= 5) {
        lowerDosage = 0
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["3-5kg"]);
        lowerWeight = 0;
        upperWeight = 5;
    } else if (weight <= 8) {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["3-5kg"]);
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["6-8kg"]);
        lowerWeight = 6;
        upperWeight = 8;
    } else {
        //TODO: Extrapolate
    }

    // Interpolera mellan doseringarna baserat på den givna vikten
    let weightRatio = (weight - lowerWeight) / (upperWeight - lowerWeight);
    let exactDosage = lowerDosage + weightRatio * (upperDosage - lowerDosage);

    // Beräkna exakt grammotsvarighet för den givna millilitern
    let exactGrams = exactDosage * weightFactor;
    
    return exactGrams;
}

export { calculateViaDetergent };
