import React from 'react'
import "./css/index.css";
import model from "./model/smart-dose-model.js";
import { observable, configure , reaction} from "mobx";

configure({ enforceActions: "never", });  // we don't use Mobx actions
const reactiveModel= observable(model);

import {createElement} from "react";
window.React= {createElement:createElement}; // no need but in case

import {createRoot} from "react-dom/client";

import App from './App-root.jsx';

createRoot(document.getElementById('root'))
    .render(<App model={reactiveModel}/>);  // mounts the app in the page DIV with the id "root"
// to see the DIV, look at react.html in the developer tools Sources
// react.html, with the content <div id="root"></div> is configured in vite.config.js

// ------ for debug purposes ----------
window.myModel= reactiveModel;             // make the model available in the Console
//window.myModel= reactiveModel;  

/*Glöm inte bort makerouter + connectToFirebase*/

/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
*/

import firebaseModel from "./firebaseModel.js";
import connectToFirebase from "./firebaseModel.js";

connectToFirebase(reactiveModel, reaction)