//mohem
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app); 
const PATH = "smartdose";


function modelToPersistence(model) {
    console.log("Model to save:", model); // Debug
    return {
        hardness: model.hardnessData, 
        status: model.status,
    };
}

function persistenceToModel(data, model) {
    console.log("Model receives from Firebase:", data); // Debug

    function saveToModel(hardness, status) {
        model.hardnessData = hardness || [];
        model.setStatus(status !== undefined ? status : false);
    }

    if (data) {
        saveToModel(data.hardness, data.status);
    } else {
        saveToModel(null, false);
    }
}



function saveToFirebase(model) {
    if (!model.ready) {
       
        set(ref(db, PATH), modelToPersistence(model))
            .then(() => console.log("Model saved to Firebase at path:", PATH))
            .catch(error => console.error("Failed to save model to Firebase:", error));

            set(ref(db, "arduino"), modelToPersistence(model))
            .then(() => console.log("Model saved to Firebase at path:", "arduino"))
            .catch(error => console.error("Failed to save model to Firebase:", error));



            if(model.user) {
                set(ref(db, path+"/"+model.user.uid), modelToPersistence(model))
                set(ref(db, "arduino"+"/"+model.user.uid), modelToPersistence(model))
            }


       
    } else {
        console.log('Model is marked as ready, not saving to Firebase');
    }
}








function readFromFirebase(model) {
    model.ready = false;
    console.log("Attempting to read from Firebase at path:", PATH);

    // Reading hardness data
    get(ref(db, PATH))
        .then(snapshot => {
            if (snapshot.exists()) {
                persistenceToModel(snapshot.val(), model);
                console.log("Hardness data successfully integrated into model");
            } else {
                console.log("No hardness data found at specified path:", PATH);
            }
        });


      


    // Reading status from a ardunio path
    console.log("Attempting to read status from Firebase at path: Arduino");
    get(ref(db, "arduino"))
        .then(snapshot => {
            if (snapshot.exists()) {
                model.setStatus(snapshot.val()); 
                console.log("Status data successfully integrated into model");
            } else {
                console.log("No status data found at specified path: Arduino");
                model.setStatus(false); 
            }
        })
        
        
}

function connectToFirebase(model) {
    readFromFirebase(model);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            model.user = user;
            model.ready = false;
            readFromFirebase(model);
        }
    });
}

function watchStatusUpdates(model) {
    const statusRef = ref(db, "arduino");
    onValue(statusRef, (snapshot) => {
        const newStatus = snapshot.val();
        console.log("Real-time status update at path Arduino/Status:", newStatus);
        model.setStatus(newStatus);
    }, {
        onlyOnce: false
    });
}


export { modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase, connectToFirebase, watchStatusUpdates };
export default connectToFirebase;