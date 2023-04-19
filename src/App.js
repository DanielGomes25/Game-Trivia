import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Configuracoes from './pages/Configuracoes';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Login } />
      <Route exact path="/configuracoes" component={ Configuracoes } />
    </div>
  );
}
