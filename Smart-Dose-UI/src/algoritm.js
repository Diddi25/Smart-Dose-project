
export function getDosageTable(typeChoice, whiteType, colorType) {
    if(typeChoice == 0) {
        return whiteType.dosageTable;
    } else {
        return colorType.dosageTable;
    }
}

export function getDosageConversion(typeChoice, whiteType, colorType) {
    if(typeChoice == 0) {
        return whiteType.dosage;
    } else {
        return colorType.dosage;
    }
}

export function getWeightRanges(hardnessDegree, dosageTable) {
    if(hardnessDegree < 8) {
        return dosageTable["Soft Water <8°dH"];
    } else if (hardnessDegree >= 8 && hardnessDegree < 14) {
        return dosageTable["Medium Water 8-14°dH"];
    } else {
        return dosageTable["Hard Water >14°dH"]
    }
}

export function getDosageInLiter(weight, weightRangeTable) {
    if(weight < 3) { //medel - (medel + hög)
        return weightRangeTable["3-5kg"] - (weightRangeTable["3-5kg"] + weightRangeTable["5-8kg"]);
    } else if (weight >= 3 && weight < 5) {
        return weightRangeTable["3-5kg"];
    } else {
        return weightRangeTable["5-8kg"];
    }
}

export function convertToGram(conversionFormula, literDosage) {
    const dosageParts = conversionFormula.split(" = ");
    const mlPart = dosageParts[0]; // "46ml"
    const gPart = dosageParts[1];
    const ml = parseInt(mlPart); // Convert "46" to integer
    const gram = parseInt(gPart); 
    return (literDosage * gram) / ml;
}




/*
         if(this.detergent_choice == 0) {
            relevantDosageTable = this.user_white_detergent.dosageTable;
            dosageConversion = this.user_white_detergent.dosage;
        } else {
            relevantDosageTable = this.user_color_detergent.dosageTable;
            dosageConversion = this.user_color_detergent.dosage;
        }

        if(this.user_hardness.Hardness < 8) {
            relevantHardnessRange = relevantDosageTable["Soft Water <8°dH"]
        } else if (this.user_hardness.Hardness >= 8 && this.user_hardness.Hardness < 14) {
            relevantHardnessRange = relevantDosageTable["Medium Water 8-14°dH"]
        } else {
            relevantHardnessRange = relevantDosageTable["Hard Water >14°dH"]
        }

        if(this.weight_choice == 0) {
            if(this.selected_weight < 3) { //medel - (medel + hög)
                const zeroTo3kg = relevantHardnessRange["3-5kg"] - (relevantHardnessRange["3-5kg"] + relevantHardnessRange["5-8kg"]);
                literDosage = zeroTo3kg;
            } else if(this.selected_weight >= 3 && this.selected_weight < 5) {
                literDosage = relevantHardnessRange["3-5kg"];
            } else {
                literDosage = relevantHardnessRange["5-8kg"];
            }
        } else {
            if(this.scale_weight < 3) { //medel - (medel + hög)
                const zeroTo3kg = relevantHardnessRange["3-5kg"] - (relevantHardnessRange["3-5kg"] + relevantHardnessRange["5-8kg"]);
                literDosage = zeroTo3kg; //13ml
            } else if(this.scale_weight >= 3 && this.scale_weight < 5) {
                literDosage = relevantHardnessRange["3-5kg"];
            } else {
                literDosage = relevantHardnessRange["5-8kg"];
            }
        }

 */