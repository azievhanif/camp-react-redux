import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { fetchPokemons } from '../features/PokemonSlice';
import PokemonCard from './PokemonCard';

const PokemonGrid = () => {
  const dispatch = useDispatch();
  const { pokemons, status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="light" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row xs={1} sm={2} md={3} lg={6} className="g-4">
        {pokemons.map((pokemon) => (
          <Col key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PokemonGrid;