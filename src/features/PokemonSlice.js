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
          weight: detailResponse.data.weight,
          stats: detailResponse.data.stats,
          abilities: detailResponse.data.abilities,
          sprites: detailResponse.data.sprites
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
    error: null,
    selectedPokemon: null
  },
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    }
  },
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

export const { setSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;