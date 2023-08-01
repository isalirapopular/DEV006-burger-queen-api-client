import { Form } from './components/Form';
import { Home } from './components/Home';
import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const handleSetUser = (userData) => {
    setUser(userData);
  };
  return (
    <div className='app'>
      {user === null ? (
        <Form setUser={handleSetUser} />
      ) : (
        <Home setUser={handleSetUser} user={user} />
      )}
   
    </div>
  );
}

export default App;
  

 
