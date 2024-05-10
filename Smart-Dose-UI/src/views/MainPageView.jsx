
import "../css/navigationbar.css";
import "../css/mainpage.css";
import logo from '../images/logo3.png';
import { useState, React, useEffect } from 'react';
import Popup from "../components/Popup";
import { set } from "firebase/database";





function MainPageView(props) {
 
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isStartDisabled, setStartDisabled] = useState(true);

    const [activeButtonDetergent, setactiveButtonDetergent] = useState(" ");
    const [activeButtonWeight, setactiveButtonWeight] = useState(" ");
    const [buttonPopup, setButtonPopup] = useState(false);
  
    
    function handleScaleWeightACB() {
        // resey  the value to 0 for 1 sec
        setTimeout(() => props.setWeight(0), 1000);
        //show the firebase scale value
        
        props.scaleChange(true);
        props.setWeight(props.weight);

        // false after 6 seconds
        setTimeout(() => props.scaleChange(false), 6000);
    }
    function buttonHandlerStart() {
        setStartDisabled(false);
    }

    const buttonClickHandlerDetergent =(buttonID) =>{
        setactiveButtonDetergent(buttonID);
    }
    
    const buttonClickHandlerWeight =(buttonID) =>{
        setactiveButtonWeight(buttonID);
    }


    function selectTypeChangeACB(evt) {
        props.selectLocationOption(evt.target.value);
    };
    function LocationShallNotBeUndefined(userHardnessObject) {
        if(userHardnessObject.Location) {
            return [userHardnessObject.Location, userHardnessObject.Hardness, "°dH"];
        } else {
            return "No internet connection";
        };
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
                DETERGENT
                <br/>
                <br/>
                <div className="main-button">
                    <button id="white" onClick={() => buttonClickHandlerDetergent("white")}disabled={activeButtonDetergent === "white"}>WHITE</button>
                    <button id="color" onClick ={() => buttonClickHandlerDetergent("color")} disabled ={activeButtonDetergent === "color"}>COLOR</button>
                </div>  
            </div>
            <div className="card">
                <div className="water-hardness">
                    WATER HARDNESS <br/>
                    <br/>
                    <br/>
                    <h6>Based on current location:</h6>
                    <select value={props.userHard.Location &&  props.userHard.Location || 'no side effect'} onChange={selectTypeChangeACB}>
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
                <button id="0-3" onClick={() => {buttonClickHandlerWeight("0-3"); buttonHandlerStart();}} disabled={activeButtonWeight === "0-3"}>0-3 kg</button>
                <button id="4-5" onClick={() => {buttonClickHandlerWeight("4-5"); buttonHandlerStart();}} disabled={activeButtonWeight === "4-5"}>4-5 kg</button>
                <button id="6+" onClick={() => {buttonClickHandlerWeight("6+");buttonHandlerStart();}} disabled={activeButtonWeight === "6+"}>6+ kg</button>
                <h6>OR use scaling device</h6>
                <button id="scale" onClick={() => {buttonClickHandlerWeight("scale");handleScaleWeightACB(); buttonHandlerStart(); setButtonPopup(true); props.scaleChange(true)}} disabled={activeButtonWeight === "scale"}>SCALE</button>
            </div>
            </div>
            <div className="card">
                START or STOP 
                <br/>
                <br/>
                <div className="ss-button">
                <br />
                <button id="start" onClick={() => {setButtonDisabled(true);props.statusChange(true);}} disabled={isStartDisabled || isButtonDisabled}>START</button>
                <button id="cancel" onClick={() => {setButtonDisabled(false);props.statusChange(false);}} disabled={!isButtonDisabled}>CANCEL</button>
                <br />
            </div>
            </div>
            </div>
            <Popup trigger={buttonPopup} setTrigger = {setButtonPopup} className="card"> 
            <div >
                    SCALE WEIGHT 
                    <br/>
                    <br/>
        
                   <h6>Hold the scale device still and wait <br/> 
                    5-10 seconds for the weight to stabilize </h6>
                    <br/>  

                    <div>
                    <input className="dropdown" type="number" value={props.weight} onChange={handleScaleWeightACB} name="quantity" min="0" placeholder="Scale weight.."  readOnly/>
                    </div>
            </div>
        

            </Popup>
            
        </div>

    );

}

export default MainPageView;

