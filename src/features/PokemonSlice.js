import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=18');
    const pokemonDetails = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const detailResponse = await axios.get(pokemon.url);
        return {
          id: detailResponse.data.id,
          name: detailResponse.data.name,
          image: detailResponse.data.sprites.front_default,
          types: detailResponse.data.types.map(type => type.type.name),
          height: detailResponse.data.height,
          weight: detailResponse.data.weight
        };
      })
    );
    return pokemonDetails;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default pokemonSlice.reducer;