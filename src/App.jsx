import React from 'react';
import './assets/style.css';
import { Header } from './components/index';
import Router from './Router';

const App = () => {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
};

export default App;
