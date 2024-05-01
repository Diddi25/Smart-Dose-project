import "../css/testpage.css";
import React, { useState } from 'react';
import HardnessNode from "../model/hardness-node";

function TestPageView(props) {

    let tabel = [];
    const [tableData, setTableData] = useState([]);

    function readHardnessData() { //funkat inte!
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
    

    function CSVREADACB() {
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

    function renderHardnessDataACB(node) {
        return <tr key={node.local_nr} >
                    <td>{node.local_name}</td>
                    <td>{node.hardness}</td>
                    <td>{node.local_nr}</td>
                </tr>;
    }

    function showDataACB() {
        props.fireButtonACB();
        window.location.reload(); //should trigger 
        setTimeout(() => {
            console.log("After 3 seconds");
        }, 3000);
    }

    return (
        <div>
            <button className="upperSpace" onClick={CSVREADACB} >Click me!</button>
            <button className="upperSpace" onClick={showDataACB}>Choose me! {props.andreas}</button>
            <div>
             <table>
                <tbody>
                  {  
                    tableData && tableData.map(renderHardnessDataACB)
                  }
                </tbody>
              </table>
            </div>
            <div>
             <table>
                <tbody>
                  {  
                    props.hard && props.hard.map(renderHardnessDataACB)
                  }
                </tbody>
              </table>
            </div>
        </div>
    );

}

export default TestPageView;