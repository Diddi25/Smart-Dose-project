
import "../css/testpage.css";
import React, { useState } from 'react';

class HardnessNode {

    constructor(local_name, hardness, local_nr) {
        this.local_nr = local_nr;
        this.local_name = local_name;
        this.hardness = hardness;
    }
}

function TestPageView(props) {
    let tabel = [];
    const [tableData, setTableData] = useState([]);

    function readHardnessData() {
        try {
            const lines = require('fs').readFileSync('water_hardness_data.csv', 'utf-8').split('\n');
            lines.forEach(line => {
                const row = line.split(",");
                const data = new HardnessNode(row[0], row[1], parseInt(row[2]));
                //const data = row[0];
                const key = row[0].replace(/\s/g, '');
                //const key = parseInt(row[2].replace(/\s/g, ''));
                const index = hashFunction1(key);
                tabel[index] = data;
            });
        } catch (e) {
            console.log("file " + "hardness data" + " not found");
        }
        return tabel;
    }

    function readHardnessData2() {
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
    }

    function hashFunction1(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i); // Add the character code of each letter
        }
        return hash % 290;
    }
    function hashFunction2(key) {
        return key % 290;
    }

    
    function renderHardnessDataACB(node) {
        return <tr key={node.local_nr} >
                    <td>{node.local_name}</td>
                    <td>{node.hardness}</td>
                    <td>{node.local_nr}</td>
                </tr>;
    }

    return (
        <div>
            <button className="upperSpace" onClick={readHardnessData2}>Click on me!</button>
            <div>
             <table>
                <tbody>
                  {  
                    tableData.map(renderHardnessDataACB)
                  }
                </tbody>
              </table>
            </div>
        </div>
    );

}

export default TestPageView;

    /*
    function renderHardnessDataACB() {
        props.hardnessData.forEach(node => {
            if (node) { // Check if the array element is not empty
                console.log(`Local Number: ${node.local_nr}, Local Name: ${node.local_name}, Hardness: ${node.hardness}`);
            }
        });
    }
    */
