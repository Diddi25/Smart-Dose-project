import "../css/navigationbar.css";
import "../css/mainpage.css";
import logo from '../images/logo3.png';
import { useState, React, useEffect } from 'react';





function MainPageView(props) {
 
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [activeButtonDetergent, setactiveButtonDetergent] = useState(" ");
    const [activeButtonWater, setactiveButtonWater] = useState(" ");
    const [activeButtonWeight, setactiveButtonWeight] = useState(" ");
  
    
    function handleScaleWeightACB(){
        props.setWeight(props.weight);

    }
       
    

    
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
               <h6>Current location:</h6>
                <select className="dropdown">
                    <option>Stockholm 4-6° dH</option>
                </select>
            </div>
            </div>
            <div className="card">
            SELECT WEIGHT
            <div className="main-button">
                <button id="0-3" onClick={() => buttonClickHandlerWeight("0-3")} disabled={activeButtonWeight === "0-3"}>0-3 kg</button>
                <button id="4-5" onClick={() => buttonClickHandlerWeight("4-5")} disabled={activeButtonWeight === "4-5"}>4-5 kg</button>
                <button id="6+" onClick={() => buttonClickHandlerWeight("6+")} disabled={activeButtonWeight === "6+"}>6+ kg</button>
                <h6>OR use scaling device</h6>
                <button id="scale" onClick={() => {buttonClickHandlerWeight("scale");handleScaleWeightACB();}} disabled={activeButtonWeight === "scale"}>SCALE</button>
                <div>
                <input className="dropdown" type="number" value={props.weight} onChange={handleScaleWeightACB} name="quantity" min="0" placeholder="Scale weight.."  readOnly/>
                </div>
            </div>
            </div>
            <div className="card">
                START / STOP
                <br/>
                <br/>
                <div className="ss-button">
                <br />
                <button id="start" onClick ={() => setButtonDisabled(true)} disabled ={isButtonDisabled} >START</button>
                <button id="cancel" onClick ={() => setButtonDisabled(false)} disabled ={!isButtonDisabled}>CANCEL</button>
    
            </div>
            </div>
            </div>
        </div>

        /* 
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
        
                <a href ="#waterhardness"> Water Hardness</a>
                
            </div>
            <div className="city-dropdown">
                <select>
                    <option>Stockholm 4-6° dH</option>
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
                <button id="scale" onClick={() => {buttonClickHandlerWeight("scale");handleScaleWeightACB();}} disabled={activeButtonWeight === "scale"}>SCALE</button>
                <div>
                <input type="number" value={props.weight} onChange={handleScaleWeightACB} name="quantity" min="0" placeholder="Scale weight.."  readOnly/>
                </div>
            </div>
            <div className="text">
                <br />
                <br />
                <p>START THE DISPENSER</p>
            </div>
            <div className="button-container">
            <br />
                <button id="start" onClick={() => {setButtonDisabled(true);props.statusChange(true);}} disabled={isButtonDisabled}>START</button>
                <button id="cancel" onClick={() => {setButtonDisabled(false);props.statusChange(false);}} disabled={!isButtonDisabled}>CANCEL</button>
                <br />
            </div>
            <footer>
                Software licences @ [footer]
            </footer>
        </div>
        */
    );

}

export default MainPageView;