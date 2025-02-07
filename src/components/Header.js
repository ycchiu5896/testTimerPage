import React from 'react';
import '../styles.css';

export default function Headers () {
    return (
        <div>
            <header className="header">
                <img className='logo' src='logo.png' alt='movidedux logo'/>
                <h2 className='app-subtitle'> It's time for popcorn! Find your next movie here.</h2>
            </header>
        </div>
    )
}