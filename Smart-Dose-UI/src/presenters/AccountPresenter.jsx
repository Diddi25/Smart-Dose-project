
import AccountView from "../views/AccountView.jsx";
import { observer } from "mobx-react-lite";

export default observer(    
    function AccountPage(props){
    /*
    function functionName(parameter) {
        return props.model.functionInModel(parameterIfAny)
    }
    */
   function setLocationACB(locationChoice) {
        props.model.changeUserHardness(locationChoice);
   }
    return <AccountView 
                                hardData = {props.model.HardnessData}/*properties used in view*/
                                userHard = {props.model.user_hardness}
                                location = {props.model.user_location}
                                selectLocationOption= {setLocationACB}
                                />;
}) // needed for the presenter to update (its view) when relevant parts of the model change
