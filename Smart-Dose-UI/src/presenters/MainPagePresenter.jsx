import MainPageView from "../views/MainPageView.jsx";

export default // needed for the presenter to update (its view) when relevant parts of the model change
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
        return <MainPageView 
                                    /*properties used in view*/
        weight={props.model.scaleWeight}      
        setWeight={handleWeightChange}
        />;
}
