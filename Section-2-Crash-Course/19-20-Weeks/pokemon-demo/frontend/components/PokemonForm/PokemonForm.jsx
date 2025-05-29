import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { catchPokemon } from '../../src/store/pokemon';

function PokemonForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPokemon = {
      name,
      type,
      pokeballId: 1
    };

    const res = await dispatch(catchPokemon(newPokemon));

    if (res.errors) {
      setErrors(res.errors)
    } else {
      navigate("/")
    }
  };

  return (
    <>
      <h1>Create Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Name'
          name='name'
        />
        {errors && <div>{errors.name}</div>}
        <input
          type='text'
          onChange={(e) => setType(e.target.value)}
          value={type}
          placeholder='Type'
          name='type'
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default PokemonForm;