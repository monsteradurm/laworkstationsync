import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Login } from './Components/Login/Login.component';

export const ServerOptions = [{label: 'Liquid Animation', value: 'ssl:52.147.58.109:1666'}, 
    {label: 'Walt Disney Imagineering', value: 'ssl:10.10.100.80:1666'}]

function App() {

  const [server, setServer] = useState(null);
  const [user, setUser] = useState(null);

  if (!user) return <Login server={server} setServer={setServer} setUser={setUser} />
  return (
    <div className="App">
      <header className="App-header">
      </header>
      
    </div>
  );
}

export default App;
