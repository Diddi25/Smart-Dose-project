
import {lookupAllHardnessData} from "./hardness-data-table.js";

export default {

    /*properties that can be persisted*/
    //username
    //user_hardness
    //user_city
    //saved_detergents
    hardness_data: [],
    detergent_type_data: [],
    satus:false,
    scaleWeight:0,
    


    accessHardness_data() {
        //const hardnessTable = new HardnessTable('water_hardness_data.csv');
        //this.hardness_data = lookupAllHardnessData(hardnessTable); 
        this.hardness_data = lookupAllHardnessData(hardness_data);
    },

    setSatus(state){
        this.status = state;
    },
    
    setScaleWeight(weight){
        this.scaleWeight = weight;
    }
    
}