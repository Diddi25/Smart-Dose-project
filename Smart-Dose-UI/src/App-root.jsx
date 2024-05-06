import { useState } from 'react'
import "./css/App.css";
import NavigationBar from "./presenters/NavigationBarPresenter.jsx";
import MainPage from "./presenters/MainPagePresenter.jsx";
import AboutPage from "./presenters/AboutPagePresenter.jsx";
import InstructionPage from "./presenters/InstructionPagePresenter.jsx";
import TestPage from "./presenters/TestPagePresenter.jsx";
import AccountPage from "./presenters/AccountPresenter.jsx";
import { createHashRouter,  RouterProvider, useParams } from "react-router-dom";
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App(props) {
    if(!props.model.ready) {
      return (
          <div>
            <div>
                <NavigationBar model={props.model}/>
            </div>
            <div>
                <RouterProvider router={makeRouter(props.model)} />
            </div>
          </div>
         )
    } else {
      return (
          <div>
              <img src="https://brfenergi.se/iprog/loading.gif" height="100"/>
          </div>
      );
  }
}

export function makeRouter(model) {
  return createHashRouter([
      {
        path: "/",
        element: <MainPage model={model} />,
        element: <MainPage model={model} />,
      },    
      {
        path: "/about",
        element: <AboutPage model={model} />,
        element: <AboutPage model={model} />,
      },   
      {
        path: "/instruction",
        element: <InstructionPage model={model} />,
      },  
      {
        path: "/test",
        element: <TestPage model={model} />,
      },  
      {
        path: "/account",
        element: <AccountPage model={model} />,
        element: <AccountPage model={model} />,
      },  
  ])
}

export default App;

