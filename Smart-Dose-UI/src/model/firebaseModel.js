// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue, child, onChildAdded, onChildRemoved, off} from "firebase/database";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const PATH_HardnessData="hardnessData";
const rf = ref(db, PATH_HardnessData);
export const auth = getAuth(app);
var path="USERID"; 

export function modelToPersistence(model) {
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
        return saveToModelACB(model.hardness);
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
