
import { useEffect, useState } from "react";
import {lookupAllHardnessData} from "./hardness-data-table.js";
import HardnessNode from './hardness-node.js';



export default {

    /*properties that can be persisted*/

    //hardnessData : [{Location:'Ale', Hardness: 3, ID: 1}, {Location: 'Alingsåddds', Hardness:1, ID: 2}],
    hardnessData : [],
    user_location : '',

    

}
