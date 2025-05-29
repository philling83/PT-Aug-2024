import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PokemonList from '../components/PokemonList/PokemonList';
import PokemonForm from '../components/PokemonForm/PokemonForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonList />
  },
  {
    path: "/new",
    element: <PokemonForm />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;