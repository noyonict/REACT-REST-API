import React from 'react';
import logo from './logo.svg';
import './App.css';
import RESTClass from './components/RESTClass';
import ClassRenderProps from './components/ClassRenderProps';
import RESTFunction from './components/RESTFunction';
import RESTAPI from './components/RESTAPI';

function App() {
  return (
    <div className="App container">
    {/* <RESTClass /> */}
    {/* <ClassRenderProps /> */}
    {/* <RESTFunction />  */}
    <RESTAPI />
    </div>
  );
}

export default App;
