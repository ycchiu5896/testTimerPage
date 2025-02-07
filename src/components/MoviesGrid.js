import React, {useState, useEffect} from 'react';
import MovieCard from './MovieCard';
import '../styles.css';


export default function MovieGrid() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('movies.json')
            .then((response) => response.json())
            .then((data) => setMovies(data));
    }, [])

    const gridContainer = movies.map((movie) => (
        <MovieCard movie={movie}/>
    ))

    return (
        <div className= 'movies-grid'>
            {gridContainer}
        </div>
    )
} 