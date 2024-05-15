function calculateIcaSkonaDetergent(detergent, weight, waterHardness, weightFactor) {
    let lowerDosage, upperDosage, lowerWeight, upperWeight;

    if (weight <= 4) {
        lowerDosage = 0;
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["3-5kg"]);
        lowerWeight = 0;
        upperWeight = 5;
    } else if (weight <= 7) {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["3-5kg"]);
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["5-8kg"]);
        lowerWeight = 5;
        upperWeight = 8;
    } else {
        // Extrapolate based on the trend in the dosage table
        let prevDosage = parseFloat(detergent.dosageTable[waterHardness]["5-8kg"]);
        let nextDosage = parseFloat(detergent.dosageTable[waterHardness]["3-5kg"]);
        let prevWeight = 8;
        let nextWeight = 5; // For wrapping around the weight range

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

export { calculateIcaSkonaDetergent };
