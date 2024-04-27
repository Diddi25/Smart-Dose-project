
import {lookupAllHardnessData} from "./hardness-data-table.js";
import HardnessNode from './hardness-node.js';


export default {

    /*properties that can be persisted*/
    //username
    //user_hardness
    //user_city
    //saved_detergents
    hardness_data: [],
    detergent_type_data: [],
    guests: 3,
    fileName : 'water_hardness_data.csv',

    hashfunction(key) {
        return key.length % 290;
    },

    setNode(key, node, index) {
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

    add_data() {
        fetch(this.fileName)
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n');
                lines.forEach(line => {
                    const [local_name, hardness, local_nr] = line.split(",");
                    const data = new HardnessNode(local_name, hardness, parseInt(local_nr)); //city, hardness, count
                    const key = local_name.replace(/\s/g, '');
                    const index = this.hashfunction(key);
                    this.setNode(key, data, index);
                });
            })
            .catch(error => {
                console.error("Error reading file: ", error);
            });
    },
    
    add_data3() {
        try {
            const lines = require('fs').readFileSync(this.fileName, 'utf-8').split('\n');
            lines.forEach(line => {
                const row = line.split(",");
                const data = new HardnessNode(row[0], row[1], parseInt(row[2])); //city, hardness, count
                //const data = row[0];
                const key = row[0].replace(/\s/g, '');
                //const key = parseInt(row[2].replace(/\s/g, ''));
                const index = this.hashfunction(key);
                this.setNode(key, data, index)
            });
        } catch (e) {
            console.log("file " + this.fileName + " not found");
        }
    },

    add_data2() {
        try {
            fetch('water_hardness_data.csv') // Assuming the file is in your public folder
                .then(response => response.text())
                .then(text => {
                    const lines = text.split('\n');
                    const data = lines.map(line => {
                        const [local_name, hardness, local_nr] = line.split(",");
                        return new HardnessNode(local_name, hardness, parseInt(local_nr));
                    });
                    setTableData(data);
                })
                .catch(error => {
                    console.error("Error reading file: ", error);
                });
        } catch (e) {
            console.error("Error reading file: ", e);
        }
    },
}