

import MainPageView from "../views/MainPageView.jsx";

export default // needed for the presenter to update (its view) when relevant parts of the model change
    function MainPage(props){
        /*
        function functionName(parameter) {
            return props.model.functionInModel(parameterIfAny)
        }
        */

        function handleWeightChange(status) {
           console.log("Changing status to:", status); 

            props.model.setStatus(status);

            console.log("Model weight updated to:", props.model.status);
        }
        return <MainPageView 
                                    /*properties used in view*/
        status={props.model.status}      
        statusChange={handleWeightChange}
        />;
}