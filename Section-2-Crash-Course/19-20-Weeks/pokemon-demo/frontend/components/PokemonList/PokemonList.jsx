import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPokemons } from "../../src/store/pokemon";

function PokemonList() {
  const dispatch = useDispatch();
  // const pokemons = useSelector(selectAllPokemons)
  const pokemons = useSelector(state => state.pokemonSlice.pokemons)
  let pokemonsArray

  if (pokemons) {
    pokemonsArray = Object.values(pokemons);
  }

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <>
      <h1>Welcome!</h1>
      {
        pokemonsArray?.map(pokemon => (
          <div key={pokemon.id}>
            <div>{pokemon.name}</div>
          </div>
        ))
      }
    </>
  )
}

export default PokemonList;