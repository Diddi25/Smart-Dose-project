import InstructionPageView from "../views/InstructionPageView.jsx";

export default // needed for the presenter to update (its view) when relevant parts of the model change
    function InstructionPage(props){
        /*
        function functionName(parameter) {
            return props.model.functionInModel(parameterIfAny)
        }
        */
        return <InstructionPageView 
                                    /*properties used in view*/
                                    hardnessData = {props.model.hardness_data}
                                    />;
}