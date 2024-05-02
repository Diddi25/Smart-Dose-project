import "../css/navigationbar.css";
import "../css/mainpage.css";
import logo from '../images/logo3.png';
import { useState, useEffect } from 'react';
import { set } from "mobx";
function MainPageView(props) {
    
    
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [activeButtonDetergent, setactiveButtonDetergent] = useState(" ");
    const [activeButtonWater, setactiveButtonWater] = useState(" ");
    const [activeButtonWeight, setactiveButtonWeight] = useState(" ");
    
    const buttonClickHandlerDetergent =(buttonID) =>{
        setactiveButtonDetergent(buttonID);
    }
    const buttonClickHandlerWater =(buttonID) =>{
        setactiveButtonWater(buttonID);
    }
    const buttonClickHandlerWeight =(buttonID) =>{
        setactiveButtonWeight(buttonID);
    }

    
    return (
        <div>
            <div className="header">
                <h1>SMART DOSE</h1>
                <img src={logo} alt="logo"></img>

            </div>
            <div className="background">
                <br />
                <p>SELECT DETERGENT TYPE</p>
                <button id="white" onClick={() => buttonClickHandlerDetergent("white")}disabled={activeButtonDetergent === "white"}>WHITE</button>
                <button id="color" onClick ={() => buttonClickHandlerDetergent("color")} disabled ={activeButtonDetergent === "color"}>COLOR</button>
                <br />
            </div>
            <div className="background-water">
                <br />
                <p>SELECT WATER HARDNESS</p>
                <button id="hard" onClick={() => buttonClickHandlerWater("hard")} disabled={activeButtonWater ==="hard"}>HARD</button>
                <button id="medium" onClick={() => buttonClickHandlerWater("medium")} disabled={activeButtonWater ==="medium"}>MEDIUM</button>
                <button id="soft" onClick={() => buttonClickHandlerWater("soft")} disabled={activeButtonWater ==="soft"}>SOFT</button>
            </div>
            <div className="city-dropdown">
                <select>
                    <option>Choose a city...</option>
                    <option>Stockholm 4-6° dH</option>
                    <option>Malmö 5.9° dH</option>
                    <option>Göteborg 2.7-3.3° dH</option>
                </select>
            </div>
            <div className="background-weight">
                <br />
                <br />
                <p>SELECT WEIGHT</p>
                <button id="0-3" onClick={() => buttonClickHandlerWeight("0-3")} disabled={activeButtonWeight === "0-3"}>0-3 kg</button>
                <button id="4-5" onClick={() => buttonClickHandlerWeight("4-5")} disabled={activeButtonWeight === "4-5"}>4-5 kg</button>
                <button id="6+" onClick={() => buttonClickHandlerWeight("6+")} disabled={activeButtonWeight === "6+"}>6+ kg</button>
                <p>OR use scaling device</p>
                <button id="scale" onClick={() => buttonClickHandlerWeight("scale")} disabled={activeButtonWeight === "scale"}>SCALE</button>
            </div>
            <div className="text">
                <br />
                <br />
                <p>START THE DISPENSER</p>
            </div>
            <div className="button-container">
                <br />
                <button id="start" onClick ={() => setButtonDisabled(true)} disabled ={isButtonDisabled} >START</button>
                <button id="cancel" onClick ={() => setButtonDisabled(false)} disabled ={!isButtonDisabled}>CANCEL</button>
                <br />
            </div>
            <footer>
                Software licences @ [footer]
            </footer>
        </div>
    );

}

export default MainPageView;