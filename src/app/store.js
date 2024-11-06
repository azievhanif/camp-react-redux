import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/PokemonSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});