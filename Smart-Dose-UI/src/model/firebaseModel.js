// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue, child, onChildAdded, onChildRemoved, off} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const PATH="smartdoseUI/test";
const PATH_HardnessData="hardnessData";
const rf = ref(db, PATH_HardnessData)

//set(ref(db, PATH+"/test"), "damn");
//set(rf, "dammit")

export function modelToPersistence(model) {
    /*
    function transformACB(degree) {
        return {degree};
    }
    */
    return {
        hardness : model.hardnessData,
    };
}

export function persistenceToModel(data, model) {
    function saveToModelACB(fromFB) {
        model.hardnessData = fromFB;
    }
    if(data) {
        return saveToModelACB(data.hardness);
    } else {
        model.hardness = [];
        return saveToModelACB(model.hardnessData);
    }
}

export function saveToFirebase(model) {
    if(!model.ready) {
        set(rf, modelToPersistence(model))
    } else {
        set(rf, "it did not go inside")
    }
}

export function readFromFirebase(model) {
    model.ready = false;
    function convertACB(snapshot) {
        return persistenceToModel(snapshot.val(), model)
    }
    function setModelReadyACB() {
        model.ready = true;
    }
    return get(rf).then(convertACB).then(setModelReadyACB);
}

export default function connectToFirebase(model, watchFunction){
    const readFirebaseObject = readFromFirebase(model);
    watchFunction(checkACB, sideEffectACB);
    function checkACB() {
        return [
            model.hardnessData,
        ];
    };
    function sideEffectACB() {
        saveToFirebase(model);
    };
}
