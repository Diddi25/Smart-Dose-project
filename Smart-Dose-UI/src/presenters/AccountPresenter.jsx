
import AccountView from "../views/AccountView.jsx";
import { observer } from "mobx-react-lite";

export default observer(    
    function AccountPage(props){

    function setLocationACB(locationChoice) {
        props.model.changeUserHardness(locationChoice);
    };
    function selectDetergent(detergentChoice) {
        props.model.setDetergentType(detergentChoice);
    };
    function removeUserWhiteDetergent() {
        props.model.removeUserWhiteDetergent();
    };
    function removeUserColorDetergent() {
        props.model.removeUserColorDetergent();
    };
    return <AccountView 
                                hardData = {props.model.HardnessData}/*properties used in view*/
                                userHard = {props.model.user_hardness}
                                selectLocationOption= {setLocationACB}
                                detergentData = {props.model.DetergentData}
                                userWhiteDetergent = {props.model.user_white_detergent}
                                userColorDetergent = {props.model.user_color_detergent}
                                selectDetergentType = {selectDetergent}
                                removeWhiteDetergent = {removeUserWhiteDetergent}
                                removeColorDetergent = {removeUserColorDetergent}
                                />;
}) // needed for the presenter to update (its view) when relevant parts of the model change
