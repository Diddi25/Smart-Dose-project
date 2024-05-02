import TestPageView from "../views/TestPage.jsx";

import { observer } from "mobx-react-lite";

export default observer(// needed for the presenter to update (its view) when relevant parts of the model change
    function TestPage(props){


        return <TestPageView   hard = {props.model.hardnessData}  
                            />;

})