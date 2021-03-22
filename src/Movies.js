import React, {useState, useEffect} from 'react'
import { store, getMovies } from './Redux_movies';

const Movies=()=>{
    const [movies, setMovies]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(false);
    
    useEffect(()=>{
        store.subscribe(()=>{
            var state=store.getState();
            setMovies(state.movies);
            setLoading(state.loading);
            setError(state.error);
        })

        store.dispatch(getMovies());
    },[])

    if(loading){
        return <div>
            <h1>Movies</h1>
            <p>Loading.. Please wait</p>
        </div>
    }

    if(error){
        return <div>
            <h1>Movies</h1>
            <p>Sorry.. Server is down. Come back later</p>
        </div>
    }

    return <div>
        <h1>Movies</h1>
        <tr>
<th>Title</th>
<th>Rating</th>
        </tr>
        {
           movies.map((movie,index)=>{
                return (
                    <tr>
                <td key={index}>{movie.title}</td>
                <td key={index}>{movie.rating}</td>
                </tr>
                )
                
            })
        }
    
    </div>
}

export default Movies;