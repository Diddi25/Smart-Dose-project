// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue, child, onChildAdded, onChildRemoved, off} from "firebase/database";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchLocation } from "../geoSource";

const app= initializeApp(firebaseConfig);
const db= getDatabase(app);
const ref_hardness = ref(db, "hardnessData");
const ref_users = ref(db, "userIDs")
const ref_root = ref(db);
export const auth = getAuth(app);

export function modelToPersistence(model) {
    console.log('Did it come here?')
    return {
        HardnessData: model.HardnessData,
        userLocation: model.user_location,
        userHardness: model.user_hardness,
    };
}

export function modelToPersistence2(model) {
    console.log('Did it come here?')
    return {

    };
}

export async function persistenceToModel(data, model) {    
    console.log('Or here? Dumb duplicate')
    function saveToModelACB(fromFB) {
        model.HardnessData = fromFB;
    }
    if(data) {
        model.user_location = data.userLocation;
        model.user_hardness = data.userHardness;
        return saveToModelACB(data.HardnessData);
    }
    console.log('Did I find it?')
}

export function saveToFirebase(model) {
    /*
    if(model.user) {
        const ref_user = ref(db, PATH+"/"+model.user.uid);
        set(ref_users, modelToPersistence2(model))
    }
    */
    //set(ref_root, modelToPersistence(model))
} 

async function fetchGeographicalInfo() {
    console.log('Here')
    model.user_location = await fetchLocation();
}

export function readFromFirebase(model) {
    model.ready = false;
    function convertACB(snapshot) {
        console.log(snapshot.val());
        return persistenceToModel(snapshot.val(), model)
    }
    function setModelReadyACB() {
        model.ready = true;
    }
    //return get(ref_root).then(convertACB).then(setModelReadyACB);
}

export default function connectToFirebase(model, watchFunction){
    //const readFirebaseObject = readFromFirebase(model); //Den ska kunna läsa oavsett user?
    console.log('Before fetching')
    fetchGeographicalInfo();
    function loginOrOutACB(user) {
        if (user) {
            model.user=user;
            model.ready=false;
        }
        //readFromFirebase(model);
    }
    onAuthStateChanged(auth, loginOrOutACB);
    watchFunction(checkACB, sideEffectACB);
    function checkACB() {
        console.log('In CheckACB')
        return [
            model.HardnessData,
            model.user_location,
            model.user_hardness,
        ];
    };
    function sideEffectACB() {
        saveToFirebase(model);
        model.setUserHardness(); //this have to be evoked at this point
    };
}
