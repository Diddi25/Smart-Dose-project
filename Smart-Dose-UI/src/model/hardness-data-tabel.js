import fs from 'fs';
import csv from 'csv-parser';

const filePath = '../../water_hardness_data.csv';

export class HardnessTable {

    static #sweden_county_nr = 290;
    
    constructor(filePath) {
        this.table = new Array(this.constructor.sweden_county_nr)
        this.currentSize = 0;

        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            console.log('File content:', fileContent); 

            const lines = fileContent.split('\n');
            console.log('Number of lines:', lines.length); 

            lines.forEach((line, lineNumber) => {
                console.log(`Line ${lineNumber + 1}:`, line); 

                const row = line.split(",").map(item => item.trim()); 
                console.log('Splitted row:', row); 

                const key = row[0].trim();
                console.log('Parsed key:', key);

            });
        } catch (e) {
            console.log("File not found");
        }
        
    }
/*
    hashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i); // Add the character code of each letter
        }
        return hash % this.constructor.sweden_county_nr;
    }

    set(key, value) {
        const index = this.hashFunction(key);
        if (!this.table[index]) {
            this.table[index] = [];
        }
        this.table[index].push(new HardnessNode(key, value, 0)); // Skapa en ny HardnessNode med key och value, där 0 är hardness
        this.currentSize++;
    }

    get(key) {
        const index = this.hashFunction(key);
        if (!this.table[index]) {
            return null;
        }
        // Loopa igenom alla HardnessNode-objekt vid detta index och hitta rätt objekt med matchande key
        for (const node of this.table[index]) {
            if (node.local_name === key) { // Använd din egen logik här för att matcha rätt objekt
                return node; // Returnera noden om den hittas
            }
        }
        return null; // Returnera null om ingen matchning hittas
    }
*/
    
}

/*
function lookupAllHardnessData(hardnessTable) {
    hardnessTable.table.forEach(node => {
        if (node) { // Check if the array element is not empty
            console.log(`Local Number: ${node.local_nr}, Local Name: ${node.local_name}, Hardness: ${node.hardness}`);
        }
    });
}




try {

            const fileContent = fs.readFileSync(filePath, 'utf-8');
            console.log('File content:', fileContent); 
            const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
            lines.forEach(line => {
                const row = line.split(",");
                const data = new HardnessNode(row[0], row[1], parseInt(row[2]));
                const key = parseInt(row[0].replace(/\s/g, ''));
                const index = this.hashFunction(key);
                this.table[index] = data;
            });
        } catch (e) {
            console.log("file not found");
        }
*/