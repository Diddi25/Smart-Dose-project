import MainPageView from "../views/MainPageView.jsx";

export default // needed for the presenter to update (its view) when relevant parts of the model change
    function MainPage(props){
        /*
        function functionName(parameter) {
            return props.model.functionInModel(parameterIfAny)
        }

        
        */

//
        function handleStatusChange(newStatus) {

            console.log("Changing status to:", newStatus); 

            props.model.setStatus(newStatus);

            console.log("Model status updated to:", props.model.status)
        }
        return <MainPageView 
                                    /*properties used in view*/

                                    statusChange={handleStatusChange}
                                    />;
}
