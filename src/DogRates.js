import React from 'react';
import { fetchRandomDogUrl } from './Dogs.resource';

export default function DogRates(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    if (state.loadingDog) {
      const abortController = new AbortController()

      fetchRandomDogUrl().then(json => {
        dispatch({type: 'loadedDog', dogUrl: json.message})
      })

      return () => {
        abortController.abort()
      }
    }
  }, [state.loadingDog])

  React.useEffect(() => {
    if (state.storingRating) {
      const storedDogs = JSON.parse(localStorage.getItem('dogs') || '[]')
      storedDogs.push({url: state.currentDogUrl, rating: state.currentRating})
      localStorage.setItem('dogs', JSON.stringify(storedDogs))
    }
  }, [state.storingRating, state.currentRating])

  return state.loadingDog ? <div>Loading...</div> : (
    <>
      <div>
        <img src={state.currentDogUrl} alt="dog" />
      </div>
      <div>
        <label htmlFor="ratings-select">
          Dog rating:
        </label>
        <select id="ratings-select" value={state.currentRating} onChange={evt => dispatch({type: "newRating", rating: evt.target.value})}>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
        </select>
      </div>
      <div>
        <button type="button" onClick={() => dispatch({type: 'rateDog'})}>
          Rate dog
        </button>
      </div>
    </>
  )
}

const initialState = {
  loadingDog: true,
  storingRating: false,
  currentDogUrl: null,
  currentRating: 10,
}

function reducer(state, action) {
  switch (action.type) {
    case 'loadedDog':
      return {
        ...state,
        loadingDog: false,
        currentDogUrl: action.dogUrl,
        currentRating: 10
      }
    case 'rateDog':
      return {
        ...state,
        storingRating: true,
        loadingDog: true
      }
    case 'newRating':
      return {
        ...state,
        currentRating: action.rating
      }
    default:
      throw Error()
  }
}
