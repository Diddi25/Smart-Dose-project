

import MainPageView from "../views/MainPageView.jsx";
import { observer } from "mobx-react-lite";

export default observer(    
    function MainPage(props){
    /*
    function functionName(parameter) {
        return props.model.functionInModel(parameterIfAny)
    }
    */
    function handleWeightChange(weight) {
        console.log("Changing status to:", weight); 

         props.model.setScaleWeight(weight);

         console.log("Model weight updated to:", props.model.setScaleWeight);
     }
    function handleSetChange(status) {
        console.log("Changing status to:", status); 

         props.model.setStatus(status);

         console.log("Model weight updated to:", props.model.status);
     }
    return <MainPageView 
                                /*properties used in view*/
                                status={props.model.status}      
                                statusChange={handleSetChange}
                                weight={props.model.scaleWeight}      
                                setWeight={handleWeightChange}
                                />;
})// needed for the presenter to update (its view) when relevant parts of the model change
