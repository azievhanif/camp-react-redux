import React from 'react';
import { Modal, Badge, Row, Col, ProgressBar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPokemon } from '../features/PokemonSlice';

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.selectedPokemon);

  if (!pokemon) return null;

  const getTypeColor = (type) => {
    const colors = {
      fire: 'danger',
      water: 'info',
      grass: 'success',
      electric: 'warning',
      ice: 'primary',
      fighting: 'danger',
      poison: 'warning',
      ground: 'purple',
      flying: 'info',
      psychic: 'danger',
      bug: 'success',
      rock: 'secondary',
      ghost: 'dark',
      dragon: 'danger',
      dark: 'dark',
      steel: 'secondary',
      fairy: 'danger',
      normal: 'secondary'
    };
    return colors[type] || 'primary';
  };

  const handleClose = () => {
    dispatch(setSelectedPokemon(null));
  };

  return (
    <Modal show={true} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title className="text-capitalize">{pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Row>
          <Col md={6} className="text-center">
            <img 
              src={pokemon.sprites.front_default} 
              alt={pokemon.name}
              className="img-fluid mb-3"
              style={{ width: '200px', height: '200px' }}
            />
            <div className="mb-3">
              {pokemon.types.map((type, index) => (
                <Badge 
                  key={index} 
                  bg={getTypeColor(type)}
                  className="me-2 text-uppercase"
                  style={{ padding: '0.5em 1em' }}
                >
                  {type}
                </Badge>
              ))}
            </div>
            <div className="mb-3">
              <p>Height: {pokemon.height / 10}m</p>
              <p>Weight: {pokemon.weight / 10}kg</p>
            </div>
          </Col>
          <Col md={6}>
            <h5 className="mb-3">Stats</h5>
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="mb-2">
                <div className="d-flex justify-content-between">
                  <small className="text-capitalize">{stat.stat.name}</small>
                  <small>{stat.base_stat}</small>
                </div>
                <ProgressBar 
                  now={stat.base_stat} 
                  max={255}
                  variant={stat.base_stat > 255 ? "success" : "info"}
                />
              </div>
            ))}
            <h5 className="mt-4 mb-3">Abilities</h5>
            {pokemon.abilities.map((ability, index) => (
              <Badge 
                key={index}
                bg="secondary"
                className="me-2 mb-2 text-capitalize"
              >
                {ability.ability.name}
              </Badge>
            ))}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PokemonDetail;