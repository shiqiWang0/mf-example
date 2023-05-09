// import AppMenus from "appMenus/AppMenus"
import React from 'react'
// import { IProps as RemoteAppMenusType } from "../../../packages/appMenus/dist/@mf-types/AppMenus";
import './App.css';

// const AppMenus = React.lazy(() => import('appMenus/AppMenus'))as unknown as React.FC<RemoteAppMenusType>

const AppMenus = React.lazy(() => import('appMenus/AppMenus'))

function App() {
  const propsConfig = {
    user: [],
    apps: [],
    lisenceApps: [],
    projectSpaceIdMap: [],
    isDemo: false,
    top: 1,
    showBackPortal: true,
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Application Component</h1>
        <AppMenus {...propsConfig}></AppMenus>
      </header>
    </div>
  )
}

export default App;
