// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue, child, onChildAdded, onChildRemoved, off} from "firebase/database";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchLocation } from "../geoSource";

const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const PATH_HardnessData="hardnessData";
const rf = ref(db, PATH_HardnessData);
export const auth = getAuth(app);
var path="USERID"; 

export function modelToPersistence(model) {
    return {
        hardness : model.hardnessData,
        userLocation : model.user_location,
    };
}

export async function persistenceToModel(data, model) {
    /*
    model.user_location = fetchLocation().then(geoInfo => {
        if (data) {
            saveToModelACB(data.hardness, model);
        }
        return geoInfo;
    }).catch(error => {
        console.error("Error fetching location info:", error);
        return null; // Return null or handle the error accordingly
    });
    */
    
    function saveToModelACB(fromFB) {
        model.hardnessData = fromFB;
    }
    if(data) {
        model.user_location = await fetchLocation();
        return saveToModelACB(data.hardness);
    } else {
        model.user_location = fetchLocation();
        return;
    }
    
}

export function saveToFirebase(model) {
    if(!model.ready) {
        set(rf, modelToPersistence(model))
        if(model.user) {
            set(ref(db, path+"/"+model.user.uid), modelToPersistence(model))
        }
    } else {
        console.log('It did not go inside')
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
    if(model.user) {
        return get(ref(db, path+"/"+ model.user.uid)).then(convertACB).then(setModelReadyACB);
    } else {
        return get(rf).then(convertACB).then(setModelReadyACB);
    }
}

export default function connectToFirebase(model, watchFunction){
    //const readFirebaseObject = readFromFirebase(model); //Den ska kunna läsa oavsett user?
    function loginOrOutACB(user) {
        if (user) {
            model.user=user;
            model.ready=false;
            readFromFirebase(model)
        } else {
            readFromFirebase(model)
        }
    }

    const readFirebaseObj = onAuthStateChanged(auth, loginOrOutACB);
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
