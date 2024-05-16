import "../css/navigationbar.css";
import "../css/mainpage.css";
import { useState, React, useEffect } from 'react';
import Popup from "../components/popup";
import { db } from '../model/firebaseModel.js'; 
import { ref, set, push } from "firebase/database";


function MainPageView(props) {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isStartDisabled, setStartDisabled] = useState(true);

    const [activeButtonDetergent, setactiveButtonDetergent] = useState(" ");
    const [activeButtonWeight, setactiveButtonWeight] = useState(" ");
    const [buttonPopupScale, setButtonPopupScale] = useState(false);
    const [buttonPopupWhite, setButtonPopupWhite] = useState(false);
    const [buttonPopupColor, setButtonPopupColor] = useState(false);
    const [buttonPopupStatus, setButtonPopupStatus] = useState(false);

    const [newDetergent, setNewDetergent] = useState({
        articleNumber: "?",
        brand: "",
        dosage: "",
        dosageTable: {
          "Hard Water >14°dH": {
            "3-5kg": "",
            "5-8kg": ""
          },
          "Medium Water 8-14°dH": {
            "3-5kg": "",
            "5-8kg": ""
          },
          "Soft Water <8°dH": {
            "3-5kg": "",
            "5-8kg": ""
          }
        },
        link: "",
        name: "",
        type: "",
        weight: ""
      });

    const handleChange = (e) => {
        setNewDetergent({
            ...newDetergent,
            [e.target.name]: e.target.value
        });
    };

    const handleDosageChange = (hardness, weight, value) => {
        setNewDetergent(prevState => ({
            ...prevState,
            dosageTable: {
                ...prevState.dosageTable,
                [hardness]: {
                    ...prevState.dosageTable[hardness],
                    [weight]: value
                }
            }
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetergentRef = push(ref(db, 'DetergentData/detergentData'));
    
        set(newDetergentRef, {...newDetergent, id: newDetergentRef.key})
            .then(() => {
                console.log('Detergent added successfully');
                setNewDetergent({
                    articleNumber: "?",
                    brand: "",
                    dosage: "",
                    dosageTable: {
                       "Hard Water >14°dH": {
                          "3-5kg": "",
                          "5-8kg": ""
                    },
                    "Medium Water 8-14°dH": {
                        "3-5kg": "",
                        "5-8kg": ""
                    },
                    "Soft Water <8°dH": {
                       "3-5kg": "",
                       "5-8kg": ""
                    }
                },
                link: "",
                name: "",
                type: "",
                weight: ""
            });
        })
        .catch((error) => {
            console.error('Error adding detergent: ', error);
        });
    };

    
    function handleScaleWeightACB() {
        props.setWeight(props.weight);
    };

    function buttonHandlerStart() {
        setStartDisabled(false);
    };

    const buttonClickHandlerDetergent = (buttonID) => {
        setactiveButtonDetergent(buttonID);
    };

    const buttonClickHandlerWeight = (buttonID) => {
        setactiveButtonWeight(buttonID);
    };

    const showStatus = () => {
        if(props.status){
            return(
            <div className="status">
                <img id="gif" src="https://brfenergi.se/iprog/loading.gif" height="100" />
            </div> 
            )
        } else {
            return(
            <div>
                Ready!
            </div>
            )
        }
    };

    function selectTypeChangeACB(evt) {
        props.selectLocationOption(evt.target.value);
    };

    function selectDetergentACB(evt) {
        props.selectDetergentType(evt.target.value);
    };

    function filterWhiteDetergentsACB(detergent) {
        if(detergent.type === 'white') {
            return detergent;
        }
    };

    function filterColorDetergentsACB(detergent) {
        if(detergent.type === 'color') {
            return detergent;
        }
    };

    function setSelectedWeight(weight) {
        props.setSelectedWeight(weight);
    };

    function startDevice() {
        //if detergentChoice + weight choice + hardness {}
        props.statusChange(true);
        props.startCalculateDosage();
    }

    return (
        <div className="main">
            <div className="header">
                <header >
                    SMART DOSE
                </header>
                <h6>“Precision in Every Wash”</h6>
            </div>
            <div className="card-container">
            <div className="card">
                ADD DETERGENT
               <form onSubmit={handleSubmit}>
                   <label>
                       Brand:
                       <input type="text" name="brand" value={newDetergent.brand} onChange={handleChange} required />
                   </label>
                   <label>
                       Dosage:
                       <input type="text" name="dosage" value={newDetergent.dosage} onChange={handleChange} required />
                  </label>
                  <label>
                       Name:
                       <input type="text" name="name" value={newDetergent.name}  onChange={handleChange} required />
                  </label>
                  <label>
                        Type:
                       <input type="text" name="type" value={newDetergent.type} onChange={handleChange} required />
                  </label>
                  <label>
                        Weight:
                        <input type="text" name="weight" value={newDetergent.weight} onChange={handleChange} required />
                  </label>

                  <h3>Dosage Table:</h3>
                  <table>
                     <thead>
                         <tr>
                             <th>Water Hardness</th>
                             <th>3-5kg</th>
                             <th>5-8kg</th>
                         </tr>
                     </thead>
                     <tbody>
                         {Object.entries(newDetergent.dosageTable).map(([hardness, weights]) => (
                             <tr key={hardness}>
                                 <td>{hardness}</td>
                                 <td>
                                    <input
                                        type="text"
                                        value={weights["3-5kg"]}
                                        onChange={(e) => handleDosageChange(hardness, "3-5kg", e.target.value)}
                                    />
                                 </td>
                                 <td>
                                    <input
                                        type="text"
                                        value={weights["5-8kg"]}
                                        onChange={(e) => handleDosageChange(hardness, "5-8kg", e.target.value)}
                                   />
                                 </td>
                             </tr>
                         ))}
                    </tbody>
                   </table>
                   <br/>
                   <input type="submit" value="Add Detergent" />
                </form>
             </div>
                <div className="card">
                    DETERGENT
                    <br />
                    <br />
                    <div className="main-button">
                        <button 
                            id="white" 
                            onClick={() => { buttonClickHandlerDetergent("white"); setButtonPopupWhite(true) }} 
                            disabled={activeButtonDetergent === "white"}>WHITE
                        </button>
                        <button 
                            id="color" 
                            onClick={() => { buttonClickHandlerDetergent("color"); setButtonPopupColor(true) }} 
                            disabled={activeButtonDetergent === "color"}>COLOR
                        </button>
                        <br />
                        <button>
                            Chosen: {activeButtonDetergent === "white" ? 
                                        props.userWhiteDetergent?.name || 'not chosen yet' : 
                                        props.userColorDetergent?.name || 'not chosen yet'} 
                        </button>
                    </div>
                </div>
                <div className="card">
                    <div className="water-hardness">
                        WATER HARDNESS <br />
                        <br />
                        <br />
                        <h6>Based on current location:</h6>
                        <select className="dropdown" 
                                value={props.userHard.Location &&  props.userHard.Location || 'no side effect'} 
                                onChange={selectTypeChangeACB}>
                            <option value={props.userHard.Location &&  props.userHard.Location || 'no side effect'}>
                                {props.userHard.Location && props.userHard.Location || 'no side effect'} {props.userHard.Hardness && props.userHard.Hardness + '°dH' || ''}
                            </option>
                            {props.hardData.map( 
                                (someOption, index) => (
                                    <option key={index} value={someOption.Location && someOption.Location || 'no internet connection'}>
                                        {someOption.Location && someOption.Location || 'no internet connection'} {someOption.Hardness}°dH
                                    </option>)
                            )}                     
                        </select>
                    </div>
                </div>
                <div className="card">
                    SELECT WEIGHT
                    <div className="main-button">
                        <button 
                            id="0-3" 
                            onClick={() => { buttonClickHandlerWeight("0-3"); buttonHandlerStart(); setSelectedWeight(1.5)}} 
                            disabled={activeButtonWeight === "0-3"}>0-3 kg
                        </button>
                        <button 
                            id="4-5" 
                            onClick={() => { buttonClickHandlerWeight("4-5"); buttonHandlerStart(); setSelectedWeight(4.5)}} 
                            disabled={activeButtonWeight === "4-5"}>4-5 kg
                        </button>
                        <button 
                            id="6+" 
                            onClick={() => { buttonClickHandlerWeight("6+"); buttonHandlerStart(); setSelectedWeight(6)}} 
                            disabled={activeButtonWeight === "6+"}>6+ kg
                        </button>
                        <h6>OR use scaling device</h6>
                        <button 
                            id="scale" 
                            onClick={() => { buttonClickHandlerWeight("scale"); 
                                            handleScaleWeightACB(); 
                                            buttonHandlerStart(); 
                                            setButtonPopupScale(true); 
                                            props.scaleChange(true) }} 
                            disabled={activeButtonWeight === "scale"}>SCALE
                        </button>
                    </div>
                </div>
                <div className="card">
                    START or STOP
                    <br />
                    <br />
                    <div className="ss-button">
                        <br />
                        <button
                            id="start"
                            onClick={() => { setButtonDisabled(true); startDevice(); setButtonPopupStatus(true) }}
                            disabled={isStartDisabled || isButtonDisabled}>START</button>
                        <button
                            id="cancel"
                            onClick={() => { setButtonDisabled(false); props.statusChange(false); }}
                            disabled={!isButtonDisabled}>CANCEL</button>
                        <br />
                    </div>
                </div>
            </div>
            <Popup trigger={buttonPopupScale} setTrigger={setButtonPopupScale} className="card">
                <div >
                    SCALE WEIGHT
                    <br />
                    <br />
                    <h6>Hold the scale device still and wait <br />
                        5-10 seconds for the weight to stabilize </h6>
                    <br />
                    <div>
                        <input className="dropdown" type="number" value={props.weight} onChange={handleScaleWeightACB} name="quantity" min="0" placeholder="Scale weight.." readOnly />
                    </div>
                </div>
            </Popup>
            <Popup trigger={buttonPopupWhite} setTrigger={setButtonPopupWhite} className="card">
                <div >
                    WHITE DETERGENTS <br />
                    Select a detergent <br />
                    <select className="dropdown" 
                                value={props.userWhiteDetergent && props.userWhiteDetergent.name ? 
                                        props.userWhiteDetergent.name : 'not chosen yet'} 
                                onChange={selectDetergentACB}>
                            <option value={'not chosen yet'}>
                                Choose white detergent...
                            </option>
                            {props.detergentData.filter(filterWhiteDetergentsACB).map( 
                                (detergent, id) => (
                                    <option key={id} value={detergent.name && detergent.name || 'error in data'}>
                                        {detergent.name && detergent.name || 'error in data'}
                                    </option>)
                            )}                     
                        </select>
                </div>
            </Popup>
            <Popup trigger={buttonPopupColor} setTrigger={setButtonPopupColor} className="card">
                <div >
                    COLOR DETERGENTS  <br />
                    Select a detergent <br />
                    <select className="dropdown" 
                                value={props.userColorDetergent && props.userColorDetergent.name ? 
                                        props.userColorDetergent.name : 'not chosen yet'} 
                                onChange={selectDetergentACB}>
                            <option value={'not chosen yet'}>
                                Choose color detergent...
                            </option>
                            {props.detergentData.filter(filterColorDetergentsACB).map( 
                                (detergent, id) => (
                                    <option key={id} value={detergent.name && detergent.name || 'error in data'}>
                                        {detergent.name && detergent.name || 'error in data'}
                                    </option>)
                            )}                     
                    </select>
                </div>
            </Popup>
            <Popup trigger={buttonPopupStatus} setTrigger={setButtonPopupStatus} className="card">
                <div >
                    <div className="status">
                        <h5>Smart Dose will soon pour your detergent</h5>
                        {showStatus()}
                        <div className="ss-button">
                            <div className="ss-button-cancle">
                                <button id="cancel" onClick={() => { setButtonDisabled(false); props.statusChange(false); }} disabled={!isButtonDisabled}>CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default MainPageView;