import "../css/instructionpage.css";


function InstructionPageView(props) {
    function renderHardnessDataACB() {
        props.hardnessData.forEach(node => {
            if (node) { // Check if the array element is not empty
                console.log(`Local Number: ${node.local_nr}, Local Name: ${node.local_name}, Hardness: ${node.hardness}`);
            }
        });
    }
    return (
        <div>
            <div>
                <title>
                    Intructions
                </title>
            </div>
            <div>
                <div className="header-instr">
                    <h1>HOW TO USE SMART DOSE?</h1>
                </div>
                <br />

                <div>
                    <div className="card-container2">
                        <div className="card-intructions">
                            <div className="instr-text">
                                <h2> STEP 1</h2>
                                <h3>SELECT DETERGENT TYPE</h3>
                                <p> Start with placing the detergent cup under the dispencer you would like to use, white or color. <br/>
                                    On the HOME page select the prefered detergent.<br/><br/><br/>
                                    If it is your first time using SMART DOSE you will get the option to enter what detergent you have filled your dispencer with, 
                                    in other case your pre selected detergent will automatically be selected for you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card-container2">
                        <div className="card-intructions">
                            <div className="instr-text">
                                <h2> STEP 2</h2>
                                <h3>SELECT WATER HARDNESS</h3>
                                <p> 
                                    For SMART DOSE to work at its absolute best you will now choose what type of water hardness there is in your location.<br/><br/>
                                    If you are located in Sweden the application will be able to detect your location.<br/><br/>
                                    If prefered you are still able to change your water hardness.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card-container2">
                        <div className="card-intructions">
                            <div className="instr-text">
                                <h2> STEP 3</h2>
                                <h3>WEIGHT </h3>
                                <p> Use the compatible scale for weighing your laundry. The application will automatically add your weight when used, 
                                    <br/> or select the prefered intervall of the weight of your laundry. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card-container2">
                        <div className="card-intructions">
                            <div className="instr-text">
                                <h2> STEP 4</h2>
                                <h3>START </h3>
                                <p> Now you can press start and let SMART DOSE do the work for you. <br/><br/>

                                    If for some reason you would like to stop the despencing then press the cancel button. <br/><br/>

                                    Happy Washing! 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={renderHardnessDataACB}>Click to verify hardness data in console</button>
            </div>
        </div>
    );

}

export default InstructionPageView;
