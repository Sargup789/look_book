import React from 'react';
import './App.css';
import Lookbook from './components/Lookbook';
import { sampleLookbook } from './data/sampleData';

function App() {
  return (
    <div className="App">
      <Lookbook looks={sampleLookbook.looks} />
    </div>
  );
}

export default App;
