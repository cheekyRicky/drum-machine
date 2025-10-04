import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DrumMachine from './components/DrumMachine';
import './components/styles/App.scss';

function App() {
  return (
    <div className="App d-flex justify-content-center align-items-center vh-100">
      <DrumMachine />
    </div>
  );
}

export default App;
