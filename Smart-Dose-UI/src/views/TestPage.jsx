import "../css/testpage.css";
import React, { useState } from 'react';
import HardnessNode from "../model/hardness-node";

function TestPageView(props) {

    function renderHardnessDataACB(node) {
        return <tr key={node.ID} >
                    <td>{node.Location}</td>
                    <td>{node.Hardness}</td>
                    <td>{node.ID}</td>
                </tr>;
    }


    function reloadPage() {
        window.location.reload();
    }
    return (
        <div>
            <button className="upperSpace" onClick={reloadPage}>Choose me!</button>
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