
import "../css/testpage.css";
import React, { useState } from 'react';

function TestPageView(props) {

    function showDataACB() {
        props.fireButtonACB();
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
            <button className="upperSpace" >Click on me!</button>
            <button onClick={showDataACB}> PROPERTY FROM MODEL : {props.gis}</button>
            <div>
             <table>
                <tbody>
                  {  
                    props.hard && props.hard.map(renderHardnessDataACB)
                    //props.hard.filter(Boolean).map(renderHardnessDataACB)
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
