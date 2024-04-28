
import { useEffect, useState } from "react";
import {lookupAllHardnessData} from "./hardness-data-table.js";
import HardnessNode from './hardness-node.js';
import Papa from 'papaparse';

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

export default {

    /*properties that can be persisted*/
    //username
    //user_hardness
    //user_city
    //saved_detergents
    hardness_data: [],
    fileName : 'water_hardness_data.csv',
    what : 'ty',
    number: 4,
    someOther: 21,
    hey: 0,
    guests: 10,
    //guests: 11,

    hashfunction(key) {
        return key.length % 290;
    },

    setNode(key, node) {
        const index = this.hashfunction(key);
        const bucket = this.hardness_data[index];
        if(!bucket) {
            this.hardness_data[key] = [[key, node]];
        } else {
            const sameKeyItem = bucket.find(item => item[0] === key);
            if(sameKeyItem) {
                sameKeyItem[1] = node;
            } else {
                bucket.push([key, node])
            }
        }
    },

    parseLinesACB(line) {
        const [local_name, hardness, local_nr] = line.split(",");
        const node = new HardnessNode(local_name, hardness, parseInt(local_nr));
        //this.setNode(local_name, node);
        return node;
    },

    add_data() {
        //this.hardness_data = [...this.hardness_data, inAFunction()];
        this.hardness_data = inAFunction();
    },
    
    add_data2() {
        try {
            fetch('water_hardness_data.csv')
                .then(response => response.text())
                .then(text => {
                    const lines = text.split('\n');
                    this.hardness_data = lines.map(this.parseLinesACB); // Pass parseLinesACB directly to map()
                    //const data = lines.map(this.parseLinesACB); // Pass parseLinesACB directly to map()
                    //this.hardness_data = [... this.hardness_data, data];
                    //lines.forEach(line => this.parseLinesACB(line));
                })
                .catch(error => {
                    console.error("Error reading file: ", error);
                });
        } catch (e) {
            console.error("Error reading file: ", e);
        }
    },

}