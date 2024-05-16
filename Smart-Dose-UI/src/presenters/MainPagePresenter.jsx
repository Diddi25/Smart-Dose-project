

import MainPageView from "../views/MainPageView.jsx";
import { observer } from "mobx-react-lite";

export default observer(    
    function MainPage(props){

    function handleWeightChange(weight) {
        console.log("Changing status to:", weight); 
        props.model.setScaleWeight(weight);
        console.log("Model weight updated to:", props.model.scale_weight);
    };
    function handleSetChange(status) {
        console.log("Changing status to:", status); 
        props.model.setStatus(status);
        console.log("Model weight updated to:", props.model.dispenser_status);
    };
    function setLocationACB(locationChoice) {
        props.model.changeUserHardness(locationChoice);
    };
    function handleScaleStatus(status){
        console.log("Changing scale status to !!!!: ", status )
        props.model.setScaleStatus(status);
        console.log("Model scale status updated to: ", props.model.scale_status);
    };
    function handleServomotor(option){
        console.log("Detergent choosen: ", option)
        props.model.setServomotor(option);
        console.log("Model servo_motor option updated to: ", props.model.servomotor_option);
    };
    function selectDetergent(detergentChoice) {
        props.model.setDetergentType(detergentChoice);
    };
    function selectWeight(manualWeight) {
        props.model.setSelectedScaleWeight(manualWeight);
    };
    function startCalculationProcess() {
        props.model.calculateOptimalDosage();
    };

    return <MainPageView 
                                weight = {props.model.scale_weight}      
                                status={props.model.dispenser_status} 
                                servomotor={handleServomotor}     
                                statusChange={handleSetChange}    
                                setWeight={handleWeightChange}
                                scaleChange={handleScaleStatus}
                                hardData = {props.model.HardnessData}
                                selectLocationOption = {setLocationACB}
                                userHard = {props.model.user_hardness}
                                detergentData = {props.model.DetergentData}
                                userWhiteDetergent = {props.model.user_white_detergent}
                                userColorDetergent = {props.model.user_color_detergent}
                                userWeightChoice = {props.model.weight_choice}
                                userSelectedDetergent = {props.model.selected_detergent}
                                selectDetergentType = {selectDetergent}
                                setSelectedWeight = {selectWeight}
                                startCalculateDosage = {startCalculationProcess}
                                />;
                                
})// needed for the presenter to update (its view) when relevant parts of the model change
