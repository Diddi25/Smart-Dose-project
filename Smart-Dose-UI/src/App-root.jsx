import { useState } from 'react'
import "./css/App.css";
import NavigationBar from "./presenters/NavigationBarPresenter.jsx";
import MainPage from "./presenters/MainPagePresenter.jsx";
import AboutPage from "./presenters/AboutPagePresenter.jsx";
import InstructionPage from "./presenters/InstructionPagePresenter.jsx";
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

export function makeRouter(props) {
  return createHashRouter([
      {
        path: "/",
        element: <MainPage model={props.model} />,
      },    
      {
        path: "/about",
        element: <AboutPage model={props.model} />,
      },   
      {
        path: "/instruction",
        element: <InstructionPage model={props.model} />,
      },  
      {
        path: "/account",
        element: <AccountPage model={props.model} />,
      },  
  ])
}

export default App;

/*
      <div>
        <Router>
          <Switch>
            <Route path="/" exact>
              <MainPage model={props.model} />
            </Route>
            <Route path="/about">
              <AboutPage model={props.model} />
            </Route>
          </Switch>
        </Router>
      </div>
*/

