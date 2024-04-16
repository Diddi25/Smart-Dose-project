import { useState } from 'react'
import "./css/App.css";
import NavigationBar from "./presenters/NavigationBarPresenter.jsx";
import MainPage from "./presenters/MainPagePresenter.jsx";

export default function App(props) {

  return (
          <div>
              <div><NavigationBar model={props.model} /></div>
              <div><MainPage model={props.model} /></div>
          </div>
        );
}
