import { csrfFetch } from "./csrf.js";
// import { createSelector } from "reselect";

const LOAD_POKEMONS = "pokemon/setPokemons";
const ADD_POKEMON = "pokemon/addPokemon";

const loadPokemons = (pokemons) => ({
  type: LOAD_POKEMONS,
  payload: pokemons
});

const addPokemon = (pokemon) => ({
  type: ADD_POKEMON,
  payload: pokemon
})

export const fetchPokemons = () => async dispatch => {
  const response = await csrfFetch("/api/pokemons");
  const data = await response.json();
  dispatch(loadPokemons(data.Pokemons));
  return response;
};

export const catchPokemon = (payload) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/pokemons", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const newPokemon = await response.json();

      dispatch(addPokemon(newPokemon));

      return newPokemon;
    }
  } catch (e) {
    const errors = await e.json();
    return errors;
  }
}

// const selectPokemons = state => state.pokemonSlice.pokemons;

// export const selectAllPokemons = createSelector(selectPokemons, (pokemons) => {
//   return pokemons ? Object.values(pokemons) : [];
// });

const initialState = { pokemons: null };

function pokemonReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POKEMONS: {
      const pokemonsState = {};

      action.payload.forEach((pokemon) => {
        pokemonsState[pokemon.id] = pokemon;
      });

      return {
        ...state,
        pokemons: { ...pokemonsState }
      };
    }
    case ADD_POKEMON: {
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
        }
      }
    }
    default:
      return state;
  }
}

export default pokemonReducer;