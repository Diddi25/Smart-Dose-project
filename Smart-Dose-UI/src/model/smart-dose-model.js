
import { useEffect, useState } from "react";
import {lookupAllHardnessData} from "./hardness-data-table.js";
import HardnessNode from './hardness-node.js';
//import Papa from 'papaparse';

/*

function inAFunction() {
    const [dataa, setData] = useState([{Location: 'hi',Hardness : 'hi', ID: 0}]);

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(fileName);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);
            const parsedData = Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true
            }).data;
            setData(parsedData);
        }
        fetchData();
    }, []);

    return dataa;
}
*/

export default {

    /*properties that can be persisted*/

    //hardnessData : [{Location:'Ale', Hardness: 3, ID: 1}, {Location: 'Alingsåddds', Hardness:1, ID: 2}],
    hardnessData : [],

    

}