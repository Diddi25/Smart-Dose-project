function calculateIcaBasicDetergent(detergent, weight, waterHardness, weightFactor) {
    let lowerDosage, upperDosage, lowerWeight, upperWeight;

    if (weight <= 5) {
        lowerDosage = 0;
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["4-5kg"]);
        lowerWeight = 4; 
        upperWeight = 5;
    } else if (weight <= 8) {
        lowerDosage = parseFloat(detergent.dosageTable[waterHardness]["4-5kg"]);
        upperDosage = parseFloat(detergent.dosageTable[waterHardness]["6-8kg"]);
        lowerWeight = 5;
        upperWeight = 8;
    } else {
        // Extrapolate based on the trend in the dosage table
        let prevDosage = parseFloat(detergent.dosageTable[waterHardness]["6-8kg"]);
        let nextDosage = parseFloat(detergent.dosageTable[waterHardness]["4-5kg"]);
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

export { calculateIcaBasicDetergent };