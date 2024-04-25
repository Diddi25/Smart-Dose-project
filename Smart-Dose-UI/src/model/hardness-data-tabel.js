
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
                const key = parseInt(row[0].replace(/\s/g, ''));
                const index = this.hashFunction(key);
                this.table[index] = data;
            });
        } catch (e) {
            console.log("file " + fileName + " not found");
        }
    }

    hashFunction(key) {
        return key % this.constructor; //antingen är hashfunktionen för local_name eller local_nr
    }

}

function lookupAllHardnessData(hardnessTable) {
    hardnessTable.table.forEach(node => {
        if (node) { // Check if the array element is not empty
            console.log(`Local Number: ${node.local_nr}, Local Name: ${node.local_name}, Hardness: ${node.hardness}`);
        }
    });
}