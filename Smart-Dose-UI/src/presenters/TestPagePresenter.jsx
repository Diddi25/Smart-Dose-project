import TestPageView from "../views/TestPage.jsx";
//import {add_data} from "../model/smart-dose-model.js";

export default // needed for the presenter to update (its view) when relevant parts of the model change
    function TestPage(props){
        /*
        function functionName(parameter) {
            return props.model.functionInModel(parameterIfAny)
        }
        */
        function ACB(parameters) {
            return props.model.add_data();
        }
        if(props.model.hardness) {
            return <TestPageView 
                                fireButtonACB = {ACB}
                                gis = {props.model.guests}
                                hard = {props.model.hardness_data}
                    />;
        } else {
            return <TestPageView 
                                fireButtonACB = {ACB}
                                gis = {props.model.guests}
            
                    />;
        }
}