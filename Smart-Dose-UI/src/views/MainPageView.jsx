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
    const [buttonPopupScale, setButtonPopupScale] = useState(false);
    const [buttonPopupWhite, setButtonPopupWhite] = useState(false);
    const [buttonPopupColor, setButtonPopupColor] = useState(false);
    const [buttonPopupStatus, setButtonPopupStatus] = useState(false);


    function handleScaleWeightACB() {
        props.setWeight(props.weight);
    }
    function buttonHandlerStart() {
        setStartDisabled(false);
    }

    const buttonClickHandlerDetergent = (buttonID) => {
        setactiveButtonDetergent(buttonID);
    }

    const buttonClickHandlerWeight = (buttonID) => {
        setactiveButtonWeight(buttonID);
    }

    const showStatus = ()=>{
        if(props.status){
            return(
            <div className="status">
                <img id="gif" src="https://brfenergi.se/iprog/loading.gif" height="100" />
            </div> 
            )
        }
        else{
            return(
            <div>
                Ready!
            </div>
            )
        }
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
                            onClick={() => { buttonClickHandlerDetergent("white"); setButtonPopupWhite(true) }} 
                            disabled={activeButtonDetergent === "white"}>WHITE
                        </button>
                        <button 
                            id="color" 
                            onClick={() => { buttonClickHandlerDetergent("color"); setButtonPopupColor(true) }} 
                            disabled={activeButtonDetergent === "color"}>COLOR
                        </button>
                    </div>

                </div>
                <div className="card">
                    <div className="water-hardness">
                        WATER HARDNESS <br />
                        <br />
                        <br />
                        <h6>Current location:</h6>
                        <select className="dropdown">
                            <option>Stockholm 4-6° dH</option>
                        </select>
                    </div>
                </div>
                <div className="card">
                    SELECT WEIGHT
                    <div className="main-button">
                        <button 
                            id="0-3" 
                            onClick={() => { buttonClickHandlerWeight("0-3"); buttonHandlerStart(); }} 
                            disabled={activeButtonWeight === "0-3"}>0-3 kg
                        </button>
                        <button 
                            id="4-5" 
                            onClick={() => { buttonClickHandlerWeight("4-5"); buttonHandlerStart(); }} 
                            disabled={activeButtonWeight === "4-5"}>4-5 kg
                        </button>
                        <button 
                            id="6+" 
                            onClick={() => { buttonClickHandlerWeight("6+"); buttonHandlerStart(); }} 
                            disabled={activeButtonWeight === "6+"}>6+ kg
                        </button>
                        <h6>OR use scaling device</h6>
                        <button 
                            id="scale" 
                            onClick={() => { buttonClickHandlerWeight("scale"); handleScaleWeightACB(); buttonHandlerStart(); setButtonPopupScale(true); props.scaleChange(true) }} 
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
                            onClick={() => { setButtonDisabled(true); props.statusChange(true); setButtonPopupStatus(true) }}
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
                    WHITE DETERGENTS 
                    Select a detergent
                   

                    <h6> Detergent 1  <br />
                        Detergent 2  </h6>
               

                </div>
            </Popup>

            <Popup trigger={buttonPopupColor} setTrigger={setButtonPopupColor} className="card">
                <div >
                    COLOR DETERGENTS  

                    Select a detergent
                   

                    <h6> Detergent 1  <br />
                        Detergent 2  </h6>
                  

                </div>
            </Popup>
            <Popup trigger={buttonPopupStatus} setTrigger={setButtonPopupStatus} className="card">
                <div >
                    <div className="status">
                        <h5>Smart Dose will soon pour your detergent</h5>
                        {showStatus}

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