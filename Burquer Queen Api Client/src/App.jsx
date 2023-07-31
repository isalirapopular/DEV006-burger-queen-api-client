import { Form } from './components/Form';
import { Home } from './components/Home';
import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className='app'>
      {user !== null ? (
        <Home setUser={setUser} user={user} />
      ) : (
        <Form setUser={setUser} />
      )}
    </div>
  );
}

export default App;
