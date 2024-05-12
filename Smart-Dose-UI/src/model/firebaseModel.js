import firebaseConfig from "/src/firebaseConfig.js";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, update, onValue } from "firebase/database";

import { getAuth } from "firebase/auth";
import { reaction } from "mobx";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const PATH = "smartdose";
export const auth = getAuth(app);

export function modelToPersistence(model) {
    return {
        status: model.status,
        weight2: model.scaleWeight,
        scaleStatus: model.scaleStatus
    };
}

export function persistenceToModel(data, model) {
    if (data) {
        model.setStatus(data.status || false);
        model.setScaleWeight(data.weight2 || 0);
        model.setScaleStatus(data.scaleStatus || false);
    }
}

export function saveToFirebase(model) {
    const updates = {};
    updates[`${PATH}/status`] = model.status;
    updates[`${PATH}/weight2`] = model.scaleWeight;
    updates[`${PATH}/scaleStatus`] = model.scaleStatus;
    update(ref(db), updates)
        .then(() => console.log("Data updated successfully!"))
        .catch(error => console.error("Failed to update data:", error));
}

export function readFromFirebase(model) {
    get(ref(db, PATH))
        .then(snapshot => {
            if (snapshot.exists()) {
                persistenceToModel(snapshot.val(), model);
            } else {
                console.log("No data found at specified path");
            }
        })
        .finally(() => {
            model.ready = true;
            console.log("Model is now ready");
        })
        .catch(error => console.error("Failed to read data:", error));
}

export default function connectToFirebase(model) {
    model.ready = false;
    readFromFirebase(model);
    reaction(
        () => [model.status, model.scaleWeight, model.scaleStatus],
        () => saveToFirebase(model)
    );
    checkUpdatesFirebase(model);
}

export function checkUpdatesFirebase(model) {
    // Listener for ScaleStatus
    const scaleStatusRef = ref(db, `${PATH}/scaleStatus`);
    onValue(scaleStatusRef, (snapshot) => {
        const newScaleStatus = snapshot.val();
        console.log("Real-time ScaleStatus update:", newScaleStatus);  // Logging for debugging
        model.setScaleStatus(newScaleStatus);
    });

    // Listener for weigh2
    const weigh2Ref = ref(db, `${PATH}/weight2`);
    onValue(weigh2Ref, (snapshot) => {
        const newWeigh2 = snapshot.val();
        console.log("Real-time weigh2 update:", newWeigh2);  // Logging for debugging
        model.setScaleWeight(newWeigh2);
    });
    // Listener for status
    const stateRef = ref(db, `${PATH}/status`);
    onValue(stateRef, (snapshot) => {
        const newstate = snapshot.val();
        console.log("Real-time weigh2 update:", newstate);  // Logging for debugging
        model.setStatus(newstate);
    });
}
