
import {lookupAllHardnessData} from "./hardness-data-table.js";

export default {

    /*properties that can be persisted*/
    //username
    //user_hardness
    //user_city
    //saved_detergents
    hardness_data: [],
    detergent_type_data: [],
    ready:false,




    setModelReadyACB(readys){


this.ready=readys;

    },
    
    status: false,

    accessHardness_data() {
        //const hardnessTable = new HardnessTable('water_hardness_data.csv');
        //this.hardness_data = lookupAllHardnessData(hardnessTable); 
        this.hardness_data = lookupAllHardnessData(hardness_data);
    },


    //servo motor status ON /OFF
    setStatus(state){
    this.status= state;

},

    
}