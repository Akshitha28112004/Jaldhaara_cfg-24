// src/App.js

import React from 'react';
import RunningProjects from './components/RunningProjects';
import CompletedPrograms from './components/CompletedPrograms';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NGO Project Dashboard</h1>
      </header>
      <main>
        <RunningProjects />
        <CompletedPrograms />
      </main>
    </div>
  );
}

export default App;
