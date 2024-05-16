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
    const [buttonPopupAdd, setButtonPopupAdd] = useState(false);
    useEffect(() => {
        setButtonDisabled(props.status); // Disable the start button if status is true
        setStartDisabled(!props.status); // Enable the start button if status is false
        console.log("my status is :", props.status);
    }, [props.status]);

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

        set(newDetergentRef, { ...newDetergent, id: newDetergentRef.key })
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
        // resey  the value to 0 for 1 sec
       // setTimeout(() => props.setWeight(0), 1000);
        //show the firebase scale value

        props.scaleChange(true);
        props.setWeight(props.weight);

        props.userWeightChoice(1);
        
        // false after 6 seconds
        setTimeout(() => props.scaleChange(false), 10000);
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
        if (props.status) {
            return (
                <div className="status">
                    <div>The dispenser is pouring/running</div>
                    <img id="gif" src="https://brfenergi.se/iprog/loading.gif" height="100" />
                </div>
            )
        } else {
            return (
                <div>
                    Ready!
                    <div>You can now take the cup</div>
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
        if (detergent.type == "white") {
            return detergent;
        };
    };

    function filterColorDetergentsACB(detergent) {
        if (detergent.type == "color") {
            return detergent;
        }
    };

    function setSelectedWeight(weight) {
        props.setSelectedWeight(weight);
    };

    function showChosenDetergent() {
        if(props.userSelectedDetergent) {
            return props.userSelectedDetergent.name;
        } else {
            return "not chosen yet";
        };
    };

    function startDevice() {
        if(props.userSelectedDetergent && props.userHard && props.weightChoice != -1) {
            props.statusChange(true);
            props.startCalculateDosage();
        };
    };
    function informUser() {
        console.log(props.userSelectedDetergent.name);
        if(props.userSelectedDetergent.name && props.userHard && props.weightChoice != -1) {
            return ('Ready to start')
        } else {
            return ('Cannot start before setting type and weight')
        };
    };

    function addDetergentACB() {
        const theNewDetergent = {
            brand : newDetergent.brand,
            dosage : newDetergent.dosage, 
            name : newDetergent.name,
            dosageTable : newDetergent.dosageTable,
            type: newDetergent.type,
            weight: newDetergent.weight
        }
        props.addDetergent(theNewDetergent)
    };


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
                    <div className="card-title"> DETERGENT</div>
                    <div className="main-button">
                        <button
                            id="white"
                            onClick={() => { buttonClickHandlerDetergent("white"); setButtonPopupWhite(true), props.servomotor("1") }}
                        >WHITE
                        </button>
                        <button
                            id="color"
                            onClick={() => { buttonClickHandlerDetergent("color"); setButtonPopupColor(true), props.servomotor("2") }}
                        >COLOR
                        </button>

                        <div className="selected-detergent">
                            Chosen: {showChosenDetergent()}
                        </div>
                        <button
                            id="add-detergent"
                            onClick={() => { buttonClickHandlerDetergent("add-detergent"); setButtonPopupAdd(true) }}  // vilken motor läggs den till i ??
                        >Add detergent
                        </button>
                    </div>
                </div>
                <div className="card">
                    <div>
                        <div className="card-title"> WATER HARDNESS</div>
                        <h6>Based on current location:</h6>
                        <select className="dropdown"
                            value={props.userHard.Location && props.userHard.Location || 'no side effect'}
                            onChange={selectTypeChangeACB}>
                            <option value={props.userHard.Location && props.userHard.Location || 'no side effect'}>
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
                    <div className="card-title"> SELECTED WEIGHT</div>
                    <div className="main-button">
                        <button
                            id="0-3"
                            onClick={() => { buttonClickHandlerWeight("0-3"); buttonHandlerStart(); setSelectedWeight(1.5) }}
                            disabled={activeButtonWeight === "0-3"}>0-3 kg
                        </button>
                        <button
                            id="4-5"
                            onClick={() => { buttonClickHandlerWeight("4-5"); buttonHandlerStart(); setSelectedWeight(4.5) }}
                            disabled={activeButtonWeight === "4-5"}>4-5 kg
                        </button>
                        <button
                            id="6+"
                            onClick={() => { buttonClickHandlerWeight("6+"); buttonHandlerStart(); setSelectedWeight(6) }}
                            disabled={activeButtonWeight === "6+"}>6+ kg
                        </button>
                        <h6>OR use scaling device</h6>
                        <button
                            id="scale"
                            onClick={() => {
                                buttonClickHandlerWeight("scale");
                                handleScaleWeightACB();
                                buttonHandlerStart();
                                setButtonPopupScale(true);
                                props.scaleChange(true)
                            }}
                            disabled={activeButtonWeight === "scale"}>SCALE
                        </button>
                    </div>

                </div>
                <div className="card">
                    <div className="card-title"> START SMART DOSE </div>
                    <div className="ss-button">
                        <button
                            id="start"
                            onClick={() => { setButtonDisabled(true); startDevice(); setButtonPopupStatus(true) }}
                            disabled={isStartDisabled || isButtonDisabled}>
                            START
                        </button>
                        <button
                            id="cancel"
                            onClick={() => { setButtonDisabled(false); props.statusChange(false); }}
<<<<<<< HEAD
                            disabled={!isButtonDisabled}>
                            CANCEL
                        </button>
=======
                            disabled={!isButtonDisabled}>CANCEL</button>
>>>>>>> 59f2e20918f30021b0630b3a4b37e0390410348c
                    </div>
                    <div>
                        {informUser()}
                    </div>
                </div>
            </div>
            <Popup trigger={buttonPopupScale} setTrigger={setButtonPopupScale} className="card">
                <div >
                    <div className="card-title"> SCALE WEIGHT </div>
                    <h6>Hold the scale device still and wait <br />
                        5-10 seconds for the weight to stabilize </h6>
                    <div>
                        <input className="dropdown" type="number" value={props.weight} onChange={handleScaleWeightACB} name="quantity" min="0" placeholder="Scale weight.." readOnly />
                    </div>
                </div>
            </Popup>
            <Popup trigger={buttonPopupWhite} setTrigger={setButtonPopupWhite} className="card">
                <div >
                    <div className="card-title"> WHITE DETERGENTS </div>
                    <div>Select a detergent</div>
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
                    <div className="card-title">COLOR DETERGENTS</div>
                    <div>Select a detergent</div>
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
                        {showStatus()}
                        <div className="ss-button">
                            <div className="ss-button-cancle">
                                <button id="cancel" 
                                        onClick={() => { setButtonDisabled(false); props.statusChange(false); }} 
                                        disabled={!isButtonDisabled}>
                                        CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
            <Popup trigger={buttonPopupAdd} setTrigger={setButtonPopupAdd} className="card">
               
                    <div >
                        <div >
                        ADD DETERGENT
                        </div>
                        <form  onSubmit={handleSubmit}>
                            <div className="detergent-form">
                            <ul className="list-detergent">
                            <li>
                                Brand:
                                <input type="text" name="brand" value={newDetergent.brand} onChange={handleChange} required />
                          </li>
                            <li>
                                Dosage:
                                <input type="text" name="dosage" value={newDetergent.dosage} onChange={handleChange} required />
                            </li>
                            <li>
                                Name:
                                <input type="text" name="name" value={newDetergent.name} onChange={handleChange} required />
                            </li>
                            </ul>
                            <ul className="list-detergent">
                            <li>
                                Type:
                                <input type="text" name="type" value={newDetergent.type} onChange={handleChange} required />
                            </li>
                            <li>
                                Weight:
                                <input type="text" name="weight" value={newDetergent.weight} onChange={handleChange} required />
                            </li>
                            </ul>
                            </div>
                            <h5>Dosage Table:</h5>
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
                            <br />
<<<<<<< HEAD
                            <button value="Add Detergent" onClick={addDetergentACB}>Add Detergent</button>
=======
                            <button value="Add Detergent" onClick={addDetergentACB}>ADD</button>
>>>>>>> 59f2e20918f30021b0630b3a4b37e0390410348c
                        </form>
                    </div>
             
            </Popup>
        </div>
    );
}




export default MainPageView;