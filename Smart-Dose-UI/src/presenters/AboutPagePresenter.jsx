import AboutPageView from "../views/AboutPageView.jsx";
import { observer } from "mobx-react-lite";

export default observer(    
    function AboutPage(props){
    /*
    function functionName(parameter) {
        return props.model.functionInModel(parameterIfAny)
    }
    */
    return <AboutPageView 
                                /*properties used in view*/
                                />;
})// needed for the presenter to update (its view) when relevant parts of the model change
