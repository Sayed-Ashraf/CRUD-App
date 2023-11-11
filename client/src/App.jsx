import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import "./App.css"
import Home from './Home.jsx'
import Create from './Create.jsx'
import Update from './Update.jsx'
import Read from './Read.jsx'


const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/edit/:id" Component={Update}/>
        <Route path="/read/:id" Component={Read}/>
        <Route path="/create" Component={Create}/>
        <Route path="/" Component={Home}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App