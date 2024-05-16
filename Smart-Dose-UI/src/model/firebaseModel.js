// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchLocation } from "../geoSource";

const app= initializeApp(firebaseConfig);
export const db= getDatabase(app);
const ref_hardness = ref(db, "HardnessData");
const ref_users = ref(db, "USERIDs")
const ref_root = ref(db);
export const auth = getAuth(app);
// test purposes :  

//set(ref(db, "/GuestUSER1"), {"bug": 5});
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
        userScaleStatus: model.scale_status,
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

// Not being used
export function PushData(model) {
    return {
        detergentData: [model]
    };
}

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
        model.dispenser_status = data.dispenserStatus || false;
        model.servomotor_option = data.servoMotorOption;
        model.scale_weight = data.userScaleWeight;
        model.scale_status = data.userScaleStatus || false;
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
            checkUpdatesForUserFirebase(model);
        } else {
            checkUpdatesAsGuest(model);
        }
        readFromDatabase();
    }
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
            model.scale_status,
            model.selected_weight,
            model.weight_choice,
            model.servomotor_option,
            model.optimal_dosage
        ];
    };
    function sideEffectACB() {
        model.setUserHardness(); //this has to be evoked at this point
        saveToFirebase(model);
    };
}

export function checkUpdatesForUserFirebase(model) {
    // Listener for userScaleWeight
    console.log("setup listener for user");
    const userDispenserStatus = ref(db, "USERID:S/" + model.user.displayName + ": " + model.user.uid + "/dispenserStatus");
    onValue(userDispenserStatus, (snapshot) => {
        const newUserDispenserStatus = snapshot.val();
        console.log("disp status update:", newUserDispenserStatus);  // Logging for debugging
        model.setScaleWeight(newUserDispenserStatus);
    });
    const userHardness = ref(db, "USERID:S/" + model.user.displayName + ": " + model.user.uid + "/userHardness");
    onValue(userHardness, (snapshot) => {
        const newHardness = snapshot.val();
        console.log("hard grade update:", newHardness);  // Logging for debugging
        model.setScaleWeight(newHardness);
    });
    const userScaleWeightRef = ref(db, "USERID:S/" + model.user.displayName + ": " + model.user.uid + "/userScaleWeight");
    onValue(userScaleWeightRef, (snapshot) => {
        const newUserScaleWeight = snapshot.val();
        console.log("scale weight update:", newUserScaleWeight);  // Logging for debugging
        model.setScaleWeight(newUserScaleWeight);
    });
    const userScaleStatus = ref(db, "USERID:S/" + model.user.displayName + ": " + model.user.uid + "/userScaleStatus");
    onValue(userScaleStatus, (snapshot) => {
        const newUserScaleStatus = snapshot.val();
        console.log("scale status update:", newUserScaleStatus);  // Logging for debugging
        model.setScaleWeight(newUserScaleStatus);
    });
}

export function checkUpdatesAsGuest(model) {
    // Listener for userScaleWeight
    console.log("setup listener for user as guest");
    const userDispenserStatus = ref(db, "GuestUSER/dispenserStatus");
    onValue(userDispenserStatus, (snapshot) => {
        const newUserDispenserStatus = snapshot.val();
        console.log("disp status update:", newUserDispenserStatus);  // Logging for debugging
        model.setScaleWeight(newUserDispenserStatus);
    });
    const userHardness = ref(db, "GuestUSER/userHardness");
    onValue(userHardness, (snapshot) => {
        const newHardness = snapshot.val();
        console.log("hard grade update:", newHardness);  // Logging for debugging
        model.setScaleWeight(newHardness);
    });
    const userScaleWeightRef = ref(db, "GuestUSER/userScaleWeight");
    onValue(userScaleWeightRef, (snapshot) => {
        const newUserScaleWeight = snapshot.val();
        console.log("scale weight update:", newUserScaleWeight);  // Logging for debugging
        model.setScaleWeight(newUserScaleWeight);
    });
    const userScaleStatus = ref(db, "GuestUSER/userScaleStatus");
    onValue(userScaleStatus, (snapshot) => {
        const newUserScaleStatus = snapshot.val();
        console.log("scale status update:", newUserScaleStatus);  // Logging for debugging
        model.setScaleWeight(newUserScaleStatus);
    });
}