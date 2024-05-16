// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, update, onValue } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchLocation } from "../geoSource";

const app= initializeApp(firebaseConfig);
export const db= getDatabase(app);
const ref_hardness = ref(db, "HardnessData");
const ref_users = ref(db, "USERIDs")
const ref_root = ref(db);
export const auth = getAuth(app);
// test purposes :  
//set(ref(db, "/GuestUSER"), {"bug": 5});

export function modelToPersistence(model) {
    return {
        userLocation: model.user_location,
        userHardness: model.user_hardness,
        userRegionName: model.user_regionName_without_county,
        userAddedDetergents: model.user_added_detergents !== undefined ? model.user_added_detergents : null,
        userWhiteDetergent: model.user_white_detergent,
        userColorDetergent: model.user_color_detergent,
        userSelectedDetergent: model.selected_detergent,
        dispenserStatus: model.dispenser_status,
        userScaleWeight: model.scale_weight,
        userSelectedWeight: model.selected_weight,
        userWeightChoice: model.weight_choice,
        servoMotorOption: model.servomotor_option,
        optimalDosage: model.optimal_dosage
    };
};

export function PushDetergentData(model) {
    return {
        detergentData: model.DetergentData
    };
};

export function persistenceToModel(data, model) {    
    function saveWeightToModelACB(userLocation) {
        if(userLocation.city != model.user_location.city) {
            model.user_location = userLocation;
        };
    };
    if(data) {
        model.user_location = data.userLocation;
        model.user_hardness = data.userHardness;
        model.user_regionName_without_county = data.userRegionName;
        model.user_added_detergents = data.userAddedDetergents;
        model.user_white_detergent = data.userWhiteDetergent || {};
        model.user_color_detergent = data.userColorDetergent || {};
        model.selected_detergent = data.userSelectedDetergent || {};
        model.dispenser_status = data.dispenserStatus;
        model.servomotor_option = data.servoMotorOption;
        model.scale_weight = data.userScaleWeight;
        model.selected_weight = data.userSelectedWeight || 0;
        model.weight_choice = data.userWeightChoice || -1;
        model.optimal_dosage = data.optimalDosage;
        return saveWeightToModelACB(data.userLocation);
    };
};

export function saveToFirebase(model) {
    if(model.user) {
        set(ref(db, "USERID:S"+"/" + model.user.displayName + ": " + model.user.uid), modelToPersistence(model));
    } else {
        set(ref(db, "/GuestUSER"), modelToPersistence(model));
    };
};

async function fetchGeographicalInfo(model) {
    model.user_location = await fetchLocation();
};

export function readFromDatabase() {
    model.ready = false;
    function userConvertACB(snapshot) {
        console.log(model.user.displayName,'s firebase object : ', snapshot.val());
        return persistenceToModel(snapshot.val(), model)
    };
    function convertACB(snapshot) {
        console.log(snapshot.val());
        return persistenceToModel(snapshot.val(), model)
    };
    function setModelReadyACB() {
        model.ready = true;
    };
    if(model.user) {
        return get(ref(db, "USERID:S/"+ model.user.displayName  + ": " + model.user.uid)).then(userConvertACB).then(setModelReadyACB);
    } else {
        return get(ref(db, "GuestUSER")).then(convertACB).then(setModelReadyACB);
    };
};

export default async function connectToFirebase(model, watchFunction){
    fetchGeographicalInfo(model);
    function loginOrOutACB(user) {
        if (user) {
            model.user=user;
        };
        readFromDatabase(model);
    };
    onAuthStateChanged(auth, loginOrOutACB);
    watchFunction(checkACB, sideEffectACB);
    function checkACB() {
        return [
            model.user_location,
            model.user_hardness,
            model.user_regionName_without_county,
            model.user_added_detergents,
            model.user_white_detergent,
            model.user_color_detergent,
            model.selected_detergent,
            model.dispenser_status,
            model.scale_weight,
            model.selected_weight,
            model.weight_choice,
            model.servomotor_option,
            model.optimal_dosage
        ];
    };
    function sideEffectACB() {
        model.setUserHardness(); //this have to be evoked at this point
        saveToFirebase(model);
    };
};

function checkArduinoUpdates(model) {

};
