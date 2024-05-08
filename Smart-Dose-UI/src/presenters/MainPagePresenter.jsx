

import MainPageView from "../views/MainPageView.jsx";
import { observer } from "mobx-react-lite";

export default observer(    
    function MainPage(props){

    function handleWeightChange(weight) {
        console.log("Changing status to:", weight); 
        props.model.setScaleWeight(weight);
        console.log("Model weight updated to:", props.model.scaleWeight);
    }
    function handleSetChange(status) {
        console.log("Changing status to:", status); 
        props.model.setStatus(status);
        console.log("Model weight updated to:", props.model.status);
    }
    function setLocationACB(locationChoice) {
        props.model.changeUserHardness(locationChoice);
    }
    function handleScaleStatus(status){
        console.log("Changing scale status to !!!!: ", status )
 
         props.model.setScaleStatus(status);
 
        console.log("Model scale status updated to: ", props.model.status);
    }

    return <MainPageView 
                                status={props.model.status}      
                                statusChange={handleSetChange}
                                weight={props.model.scaleWeight}      
                                setWeight={handleWeightChange}
                                scaleChange={handleScaleStatus}
                                hardData = {props.model.HardnessData}/*properties used in view*/
                                userHard = {props.model.user_hardness}
                                selectLocationOption= {setLocationACB}
                                />;
})// needed for the presenter to update (its view) when relevant parts of the model change
