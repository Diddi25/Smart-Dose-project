
<<<<<<< Updated upstream
export default {

    /*properties that can be persisted*/
    water_hardness: [],
    detergent_type_white: [],
    user_name: "username",
=======
import { HardnessTable } from './hardness-data-tabel.js';

const filePath = '../../water_hardness_data.csv';
const hardnessTable = new HardnessTable(filePath);
/*
// Testfall: Hämta vattenhårdheten för några exempelkommuner
const hardnessStockholm = hardnessTable.get('Stockholm');
const hardnessGothenburg = hardnessTable.get('Gothenburg');
const hardnessMalmo = hardnessTable.get('Malmo');

// Skriv ut resultaten
console.log('Vattenhårdheten i Stockholm:', hardnessStockholm);
console.log('Vattenhårdheten i Gothenburg:', hardnessGothenburg);
console.log('Vattenhårdheten i Malmö:', hardnessMalmo);

*/
/*
import {lookupAllHardnessData} from "/model/hardness-data-table.js";

export default {

    /*properties that can be persisted
    //username
    //user_hardness
    //user_city
    //saved_detergents
    //hardness_data
    //detergent_type_data

    accessHardness_data() {
        lookupAllHardnessData("water_hardness_data.csv"); 
    }
>>>>>>> Stashed changes

    
}*/