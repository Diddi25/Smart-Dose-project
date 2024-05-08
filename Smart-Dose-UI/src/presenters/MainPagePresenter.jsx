

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

        console.log("Model weight scale updated to:", props.model.scaleWeight);
     }
    
    
     function handleSetChange(status) {
        console.log("Changing status servo motor to:", status); 

         props.model.setStatus(status);

         console.log("Model weight updated to:", props.model.status);
     }
     
     
     function handleScaleStatus(status){
       console.log("Changing scale status to !!!!: ", status )

        props.model.setScaleStatus(status);

       console.log("Model scale status updated to: ", props.model.status);
     }

    return <MainPageView 
                                /*properties used in view*/
                                status={props.model.status}      
                                statusChange={handleSetChange}
                                weight={props.model.scaleWeight}      
                                setWeight={handleWeightChange}
                                scaleChange={handleScaleStatus}
                                />;
})// needed for the presenter to update (its view) when relevant parts of the model change
