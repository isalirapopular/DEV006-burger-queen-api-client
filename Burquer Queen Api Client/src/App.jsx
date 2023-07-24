import { Form } from './components/Form'
import { Home } from './components/Home' //no entiendo por que me sale este error
import { useState } from 'react'
import './App.css'

function App() {

  const {user, setUser}=useState([])
  

  return (
  <div className="App">
    {
      user.length > 0
      ? <Form setUser= {setUser} />
      : <Home/>
    }
    
    <Form setUser= {setUser} />
    <Home/>
    </div>  
  )
}

export default App
