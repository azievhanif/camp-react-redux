import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import { store } from './app/store';
import PokemonGrid from './components/PokemonGrid';

function App() {
  return (
    <Provider store={store}>
      <Container fluid className="py-4">
        <h1 className="text-center mb-4 app-title">Pokemon Cards</h1>
        <PokemonGrid />
      </Container>
    </Provider>
  );
}

export default App;