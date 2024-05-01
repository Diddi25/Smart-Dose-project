import TestPageView from "../views/TestPage.jsx";
//import {add_data} from "../model/smart-dose-model.js";

export default // needed for the presenter to update (its view) when relevant parts of the model change
    function TestPage(props){
        /*
        function functionName(parameter) {
            return props.model.functionInModel(parameterIfAny)
        }
        */

        return <TestPageView   hard = {props.model.hardnessData}  
                            />;

}