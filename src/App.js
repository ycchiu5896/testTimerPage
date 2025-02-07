import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieGrid from './components/MoviesGrid';

function App() {

  return (
    <div className="App">
      <div className='container'>
        <Header/>
        <MovieGrid/>
      </div>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
