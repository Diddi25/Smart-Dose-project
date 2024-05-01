
import AccountView from "../views/AccountView.jsx";
import { observer } from "mobx-react-lite";

export default observer(    
    function AccountPage(props){
    /*
    function functionName(parameter) {
        return props.model.functionInModel(parameterIfAny)
    }
    */
    return <AccountView 
                                hard = {props.model.hardnessData}/*properties used in view*/
                                />;
}) // needed for the presenter to update (its view) when relevant parts of the model change
