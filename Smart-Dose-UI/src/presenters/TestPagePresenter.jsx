import TestPageView from "../views/TestPage.jsx";
//import {add_data} from "../model/smart-dose-model.js";

export default // needed for the presenter to update (its view) when relevant parts of the model change
    function TestPage(props){
        /*
        function functionName(parameter) {
            return props.model.functionInModel(parameterIfAny)
        }
        */
        function ACB() {
            return props.model.add_data2();
        }
        if(props.model.hardnessData) {
            return <TestPageView 
                                fireButtonACB = {ACB}
                                gis = {props.model.guests}
                                hard = {props.model.hardnessData}
                                andreas = {props.model.Andreas}
                    />;
        } else {
            return <TestPageView 
                                fireButtonACB = {ACB}
                                gis = {props.model.guests}
                    />;
        }

}