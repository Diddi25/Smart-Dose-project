import { useState } from 'react'
import "./css/App.css";
import NavigationBar from "./presenters/NavigationBarPresenter.jsx";
import MainPage from "./presenters/MainPagePresenter.jsx";
import { createHashRouter,  RouterProvider, useParams } from "react-router-dom";

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
  ])
}

export default App;


