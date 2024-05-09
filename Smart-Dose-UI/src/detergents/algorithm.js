
function mainAlgoritm(detergent, weight, hardness) {
    const waterHardness = hardnessToString(hardness);

    switch(detergrnt.brand.toLowerCase()) {
        // Case algoritm för ica
        case 'ica':
            return ica.calculateDetergent(detergent, weight, waterHardness );
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