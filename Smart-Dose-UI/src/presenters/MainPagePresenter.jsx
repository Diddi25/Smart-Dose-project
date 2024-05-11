

import MainPageView from "../views/MainPageView.jsx";
import { observer } from "mobx-react-lite";

export default observer(    
    function MainPage(props){

    function handleWeightChange(weight) {
        console.log("Changing status to:", weight); 
        props.model.setScaleWeight(weight);
        console.log("Model weight updated to:", props.model.scaleWeight);
    };
    function handleSetChange(status) {
        console.log("Changing status to:", status); 
        props.model.setStatus(status);
        console.log("Model weight updated to:", props.model.status);
    };
    function setLocationACB(locationChoice) {
        props.model.changeUserHardness(locationChoice);
    };
    function handleScaleStatus(status){
        console.log("Changing scale status to !!!!: ", status )
        props.model.setScaleStatus(status);
        console.log("Model scale status updated to: ", props.model.status);
    };
    function selectDetergent(detergentChoice) {
        props.model.setDetergentType(detergentChoice);
    };

    return <MainPageView 
                                status={props.model.dispenser_status}      
                                statusChange={handleSetChange}
                                weight={props.model.scaleWeight}      
                                setWeight={handleWeightChange}
                                scaleChange={handleScaleStatus}
                                hardData = {props.model.HardnessData}
                                userHard = {props.model.user_hardness}
                                detergentData = {props.model.DetergentData}
                                userWhiteDetergent = {props.model.user_white_detergent}
                                userColorDetergent = {props.model.user_color_detergent}
                                selectDetergentType = {selectDetergent}
                                selectLocationOption= {setLocationACB}
                                />;
})// needed for the presenter to update (its view) when relevant parts of the model change
