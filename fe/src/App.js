import React, { useState } from 'react';
import './App.css';
import APIContext from './Components/APIContext';
import FormikRegister from './Components/Register';
import UsersList from './Components/Users';

function App() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  return (
    <div className="App">
      <APIContext.Provider value={[lastUpdate, setLastUpdate]}>
        <FormikRegister setLastUpdate={setLastUpdate} />
        <UsersList lastUpdate={lastUpdate} />
      </APIContext.Provider>
    </div>
  );
}

export default App;
