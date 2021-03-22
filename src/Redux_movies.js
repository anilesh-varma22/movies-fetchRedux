import { createStore, applyMiddleware } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";

//Actions
const GETMOVIES_STARTED = "GETMOVIES_STARTED";
const GETMOVIES_SUCCESS = "GETMOVIES_SUCCESS";
const GETMOVIES_FAILED = "GETMOVIES_FAILED";

export const getMoviesStarted = () => {
  return {
    type: GETMOVIES_STARTED,
  };
};

export const getMoviesSuccess = (users) => {
  return {
    type: GETMOVIES_SUCCESS,
    users,
  };
};

export const getMoviesFailed = (error) => {
  return {
    type: GETMOVIES_FAILED,
    error,
  };
};

export const getMovies = () => {
  return (dispatch) => {
    dispatch(getMoviesStarted());
    fetch("https://gist.githubusercontent.com/alanponce/d8a5e47b4328b5560fb610c5731de2bd/raw/b9f2a2b20d7d71f0e9c31adf40c7c83308809ac0/movies.json")
      .then((response) => response.json())
      .then((movies) => {
        dispatch(getMoviesSuccess(movies));
      })
      .catch((error) => {
        dispatch(getMoviesFailed(error));
      });
  };
};

var initialState = {
  movies: [],
  loading: false,
  error: false,
};

//Reducer
const movies = (state = initialState, action) => {
  switch (action.type) {
    case GETMOVIES_STARTED:
      return {
        movies: [],
        loading: true,
        error: false,
      };
    case GETMOVIES_SUCCESS:
      return {
        ...state,
        movies: action.movies,
        loading: false,
      };
    case GETMOVIES_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

//Store
export const store = createStore(movies, applyMiddleware(logger, thunk));
