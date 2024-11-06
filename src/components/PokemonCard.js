import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSelectedPokemon } from '../features/PokemonSlice';

const PokemonCard = ({ pokemon }) => {
  const dispatch = useDispatch();

  const getTypeColor = (type) => {
    const colors = {
      fire: 'danger',
      water: 'primary',
      grass: 'success',
      electric: 'warning',
      ice: 'primary',
      fighting: 'danger',
      poison: 'warning',
      ground: 'purple',
      flying: 'info',
      psychic: 'pink', 
      bug: 'success',
      rock: 'secondary',
      ghost: 'indigo',
      dragon: 'danger',
      dark: 'dark',
      steel: 'secondary',
      fairy: 'danger',
      normal: 'secondary'
    };
    return colors[type] || 'primary';
  };
  const handleClick = () => {
    dispatch(setSelectedPokemon(pokemon));
  };

  return (
    <Card className="h-100" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="text-center p-3">
        <Card.Img 
          variant="top" 
          src={pokemon.image} 
          alt={pokemon.name}
          style={{ 
            width: '120px', 
            height: '120px', 
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center text-capitalize mb-3 fw-bold">
          {pokemon.name}
        </Card.Title>
        <div className="text-center mb-3">
          {pokemon.types.map((type, index) => (
            <Badge 
              key={index} 
              bg={getTypeColor(type)}
              className="me-1 text-uppercase"
              style={{ padding: '0.5em 1em' }}
            >
              {type}
            </Badge>
          ))}
        </div>
        <div className="text-center pokemon-stats mt-auto">
          <div>Height: {pokemon.height / 10}m</div>
          <div>Weight: {pokemon.weight / 10}kg</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;