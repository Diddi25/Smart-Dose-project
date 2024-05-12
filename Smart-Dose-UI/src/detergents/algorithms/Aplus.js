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
        //return parseFloat(detergent.dosageTable[waterHardness]["8+kg"]);
        // Extrapolate based on the trend in the dosage table
        let prevDosage = parseFloat(detergent.dosageTable[waterHardness]["5-7kg"]);
        let nextDosage = parseFloat(detergent.dosageTable[waterHardness]["3-4kg"]);
        let prevWeight = 7;
        let nextWeight = 4; // For wrapping around the weight range

        // Calculate the rate of increase per kilogram of weight
        let dosageRate = (nextDosage - prevDosage) / (nextWeight - prevWeight);

        // Extrapolate dosage for the given weight
        lowerDosage = prevDosage;
        upperDosage = prevDosage + dosageRate * (weight - prevWeight);
        lowerWeight = prevWeight;
        upperWeight = weight; // Weight above 8 kg
    }

    // Interpolate between dosages based on the given weight
    let weightRatio = (weight - lowerWeight) / (upperWeight - lowerWeight);
    let exactDosage = lowerDosage + weightRatio * (upperDosage - lowerDosage);

    // Calculate exact grams corresponding to the given milliliters
    let exactGrams = exactDosage * weightFactor;
    
    return exactGrams;
}

export { calculateAplusDetergent };
