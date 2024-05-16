import "../css/instructionpage.css";

function InstructionPageView(props) {
    return (
        <div className="profile-container">
            <div>
                <title>Intructions</title>
            </div>
            <div className="header-about">
                <h1>HOW TO USE SMART DOSE?</h1>
            </div>
            <br />
            <div className="card-container">
                <div className="card-container2">
                    <div className="card-intructions">
                        <div className="instr-text">
                            <h2> STEP 1</h2>
                            <h3>SELECT DETERGENT TYPE</h3>
                            <p>Start by placing the detergent cup under your preferred dispenser (white or color). On the HOME page select the prefered detergent.
                            <br/><br/><br/>
                                If it's your first time, enter the detergent you've filled the dispenser with. Otherwise, your pre-selected detergent will be automatically chosen.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-container2">
                    <div className="card-intructions">
                        <div className="instr-text">
                            <h2> STEP 2</h2>
                            <h3>SELECT WATER HARDNESS</h3>
                            <p>Choose your water hardness level. If you're in Sweden, the app can detect your location. Otherwise, you can manually adjust the water hardness setting.</p>
                        </div>
                    </div>
                </div>
                <div className="card-container2">
                    <div className="card-intructions">
                        <div className="instr-text">
                            <h2> STEP 3</h2>
                            <h3>WEIGHT</h3>
                            <p>Weigh your laundry using a compatible scale. The app can automatically detect the weight or you can input the weight range manually.</p>
                        </div>
                    </div>
                </div>
                <div className="card-container2">
                    <div className="card-intructions">
                        <div className="instr-text">
                            <h2> STEP 4</h2>
                            <h3>START</h3>
                            <p>Press start to let SMART DOSE dispense the detergent. If you need to stop, press cancel. Happy Washing!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructionPageView;
