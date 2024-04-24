// you will find 2 imports already there, add the configuration and instantiate the app and database:
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { searchRecipesByIngredients, getRecipeInformation } from "/src/recipeSource.js";
import { getDatabase, ref, get, set, onValue, child, onChildAdded, onChildRemoved, off} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app= initializeApp(firebaseConfig)
const db= getDatabase(app)

//  PATH is the “root” Firebase path. NN is your TW2_TW3 group number
const PATH="smartdose";

set(ref(db, PATH+"/test"), "dummy");