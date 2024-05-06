import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";
import { reaction } from "mobx";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const PATH = "smartdose";
//set(ref(db, PATH+"/status"), "true");

export function modelToPersistence(model) {
    const data = {
        status: model.status,
        
    };
    console.log("Preparing to save:", data); // Debug: log data being saved
    return data;
}

export function persistenceToModel(data, model) {
    console.log("Data retrieved from Firebase:", data); // Debug: log data retrieved
    if (data) {
        model.setStatus(data.status || false);
        
    }
}

export function saveToFirebase(model) {
    if (model.ready) {
        const updates = {};
        updates[`${PATH}/status`] = model.status;
        update(ref(db), updates)
            .then(() => console.log("Data updated successfully!"))
            .catch(error => console.error("Failed to update data:", error));
    }
}

export function readFromFirebase(model) {
    model.ready = false;
    get(ref(db, PATH))
        .then(snapshot => {
            if (snapshot.exists()) {
                persistenceToModel(snapshot.val(), model);
                console.log("Data successfully loaded into model");
            } else {
                console.log("No data found at specified path");
            }
        })
        .then(() => {
            model.ready = true;
            console.log("Model is now ready");
        })
        .catch(error => console.error("Failed to read data:", error));
}

export default function connectToFirebase(model) {
    readFromFirebase(model);
    reaction(
        () => model.status,
        () => saveToFirebase(model)
    );
    chekUpdatesFirebase(model);
}

export function chekUpdatesFirebase(model) {
    const statusRef = ref(db, `${PATH}/status`);
    onValue(statusRef, (snapshot) => {
        const newStatus = snapshot.val();
        console.log("Real-time status update:", newStatus);
        model.setStatus(newStatus);
    },
     {
        onlyOnce: false
    }
);
}
