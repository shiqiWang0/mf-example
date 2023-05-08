// import AppMenus from "appMenus/AppMenus"
import React from 'react'
import './App.css';

const AppMenus = React.lazy(() => import('appMenus/AppMenus'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Application Component</h1>
        <AppMenus></AppMenus>
      </header>
    </div>
  );
}

export default App;
