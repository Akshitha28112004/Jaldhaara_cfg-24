// src/App.js
import React from 'react';
import EmailButton from './components/Email';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Statewise Expenditure Email Sender</h1>
        <EmailButton />
      </header>
    </div>
  );
}

export default App;
