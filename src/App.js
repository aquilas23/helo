import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import routes from './routes';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        {routes}
      </header>
    </div>
  );
}

export default App;
