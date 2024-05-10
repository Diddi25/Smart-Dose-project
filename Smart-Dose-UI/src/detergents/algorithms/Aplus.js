function calculateAplusDetergent(detergent, weight, waterHardness, weightFactor) {
    let lowerDosage, upperDosage, lowerWeight, upperWeight;

    if (weight <= 4) {
        lowerDosage = 0;
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["3-4kg"]);
        lowerWeight = 0;
        upperWeight = 4;
    } else if (weight <= 7) {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["3-4kg"]);
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["5-7kg"]);
        lowerWeight = 4;
        upperWeight = 7;
    } else {
        return parseFloat(detergent.dosageTable[waterHardness]["8+kg"]);
    }

    // Interpolera mellan doseringarna baserat på den givna vikten
    let weightRatio = (weight - lowerWeight) / (upperWeight - lowerWeight);
    let exactDosage = lowerDosage + weightRatio * (upperDosage - lowerDosage);

    // Beräkna exakt grammotsvarighet för den givna millilitern
    let exactGrams = exactDosage * weightFactor;
    
    return `${exactGrams} g`;
}

export { calculateAplusDetergent };
