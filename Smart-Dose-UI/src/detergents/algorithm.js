
function mainAlgoritm(detergent, weight, waterHardness) {
    switch(detergrnt.brand.toLowerCase()) {
        // Case algoritm för ica
        case 'ica':
            return ica.calculateDetergent(detergent, weight, waterHardness);
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