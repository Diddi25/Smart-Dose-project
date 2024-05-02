import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";
import { reaction } from "mobx";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const PATH = "smartdose";
//set(ref(db, PATH+"/status"), "dummy");

function modelToPersistence(model) {
    const data = {
        status: model.status,
        
        
    };
    console.log("Model to save:", data); // Debug
    return data;
}

function persistenceToModel(data, model) {
    console.log("Model gets from Firebase:", data); // Debug:
    if (data) {
        model.setStatus(data.status || false);
        
    }
}

function saveToFirebase(model) {
    if (model.ready) {
        const updates = {};
        updates[`${PATH}/status`] = model.status;
        update(ref(db), updates)
            .then(() => console.log("Status updated successfully!")) 
            .catch(error => console.error("Status to update data:", error));
    }
}

function readFromFirebase(model) {
    model.ready = false;
    get(ref(db, PATH))
        .then(snapshot => {
            if (snapshot.exists()) {
                persistenceToModel(snapshot.val(), model);
                console.log("Data successfully moves into model"); 
            } else {
                console.log("No data found at specified path"); //debug the data found or not
            }
        })
        .then(() => {
            model.ready = true;
            console.log("Model is  ready"); //check if the model is ready 
        })
        .catch(error => console.error("Failed to read data from firevbase:", error)); 
}

 
export function connectToFirebase(model) {
    readFromFirebase(model);
    reaction(
        () => model.status,
        () => saveToFirebase(model)
    );
    checkUpdatesFirebase(model);
}

export function checkUpdatesFirebase(model) {
    const statusRef = ref(db, `${PATH}/status`);
    onValue(statusRef, (snapshot) => {
        const newStatus = snapshot.val();
        console.log("Real-time status update:", newStatus);
        model.setStatus(newStatus);
    }, {
        onlyOnce: false
    });
}

// Export other functions as needed
export { modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase };