

class HardnessTable {

    static #sweden_county_nr = 290;

    constructor(fileName) {
        this.table = new Array(this.constructor.sweden_county_nr)
        this.currentSize = 0;

        try {
            const lines = require('fs').readFileSync(fileName, 'utf-8').split('\n');
            lines.forEach(line => {
                const row = line.split(",");
                const data = new HardnessNode(row[0], row[1], parseInt(row[2]));
                const key = row[0].replace(/\s/g, '');
                const index = this.hashFunction(key);
                this.table[index] = data;
            });
        } catch (e) {
            console.log("file " + fileName + " not found");
        }
    }

    hashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i); // Add the character code of each letter
        }
        return hash % this.constructor.sweden_county_nr;
    }

}

const nrOfCounties = 290;
const table = [];

function readHardnessData(table, fileName) {
    
    try {
        const lines = require('fs').readFileSync(fileName, 'utf-8').split('\n');
        lines.forEach(line => {
            const row = line.split(",");
            const data = new HardnessNode(row[0], row[1], parseInt(row[2]));
            const key = row[0].replace(/\s/g, '');
            const index = hashFunction(key);
            table[index] = data;
        });
    } catch (e) {
        console.log("file " + fileName + " not found");
    }
    return table;
}

function hashFunction(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i); // Add the character code of each letter
    }
    return hash % nrOfCounties;
}

export function lookupAllHardnessData(hardness_data) {
    /*
    hardnessTable.table.forEach(node => {
        if (node) { // Check if the array element is not empty
            console.log(`Local Number: ${node.local_nr}, Local Name: ${node.local_name}, Hardness: ${node.hardness}`);
        }
    });
    */
    return readHardnessData(hardness_data, 'water_hardness_data.csv');
}