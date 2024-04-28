// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue, child, onChildAdded, onChildRemoved, off} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const PATH="smartdoseUI/test";
const rf = ref(db, PATH)

//set(ref(db, PATH+"/test"), "damn");
//set(rf, "dammit")

export function modelToPersistence(model) {
    return {
        fileName : model.fileName,
        currDish : model.what,
        number: model.number,
        someOther : model.someOther,
        guests: model.guests,
        hey: model.hey,
    };
}

export function persistenceToModel(data, model) {
    if(data) {
        model.guests = data.dumbGuest;
        return saveToModelACB();
    } else {
        model.guests = 4;
        return saveToModelACB();
    }
    function saveToModelACB(fromFB) {
        model.guests = fromFB;
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
            model.guests,
        ];
    };
    function sideEffectACB() {
        saveToFirebase(model);
    };
}
