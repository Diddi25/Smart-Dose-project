import "../css/navigationbar.css";
import "../css/mainpage.css";
import logo from '../images/logo3.png';
import { useState, React, useEffect } from 'react';
import Popup from "../components/popup";
import { db } from '../model/firebaseModel.js'; 
import { PushDetergentData } from '../model/firebaseModel.js';
import { getDatabase, ref, set } from "firebase/database";


function MainPageView(props) {

    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isStartDisabled, setStartDisabled] = useState(true);

    const [activeButtonDetergent, setactiveButtonDetergent] = useState(" ");
    const [activeButtonWeight, setactiveButtonWeight] = useState(" ");
    const [buttonPopupScale, setButtonPopupScale] = useState(false);
    const [buttonPopupWhite, setButtonPopupWhite] = useState(false);
    const [buttonPopupColor, setButtonPopupColor] = useState(false);
    const [buttonPopupStatus, setButtonPopupStatus] = useState(false);
    useEffect(() => {
        setButtonDisabled(props.status); // Disable the start button if status is true
        setStartDisabled(!props.status); // Enable the start button if status is false
        console.log("my status is :", props.status);
    }, [props.status]);

    function handleScaleWeightACB() {
        // resey  the value to 0 for 1 sec
        setTimeout(() => props.setWeight(0), 1000);
        //show the firebase scale value
        
        props.scaleChange(true);
        props.setWeight(props.weight);
        
        // false after 6 seconds
        setTimeout(() => props.scaleChange(false), 6000);
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
                <div>The dispenser is pouring/running</div>
                <img id="gif" src="https://brfenergi.se/iprog/loading.gif" height="100" />
            </div> 
            )
        } else {
            return(
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
    function showChosenDetergent() {
        if(activeButtonDetergent === " " || activeButtonDetergent === "white") {
            if(props.userWhiteDetergent) {
                return props.userWhiteDetergent.name;
            } else {
                return "not chosen yet";
            }
        } else {
            if(activeButtonDetergent === " " || activeButtonDetergent === "color") {
                if(props.userColorDetergent) {
                    return props.userColorDetergent.name;
                } else {
                    return "not chosen yet";
                }
            }
        }
    }
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
                    DETERGENT
                    <br />
                    <br />
                    <div className="main-button">
                        <button 
                            id="white" 
                            onClick={() => { buttonClickHandlerDetergent("white"); setButtonPopupWhite(true), props.servomotor("1") }} 
                            disabled={activeButtonDetergent === "white"}>WHITE
                        </button>
                        <button 
                            id="color" 
                            onClick={() => { buttonClickHandlerDetergent("color"); setButtonPopupColor(true), props.servomotor("2") }} 
                            disabled={activeButtonDetergent === "color"}>COLOR
                        </button>
                        <br />
                        <button>
                            Chosen: {showChosenDetergent()} 
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
                            <option value={props.userHard.Location &&  props.userHard.Location}>
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