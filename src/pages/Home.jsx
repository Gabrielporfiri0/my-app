import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Home = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    const endpoints = [];
    for (let i = 1; i <= 100; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    try {
      const responses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
      setPokemons(responses);
      setAllPokemons(responses);
    } catch (error) {
      console.error('Erro ao buscar os pokémons:', error);
    }
  };

  const pokemonFilter = (name) => {
    if (name === '') {
      setPokemons(allPokemons);
      return;
    }

    const filtered = allPokemons.filter((pokemon) =>
      pokemon.data.name.includes(name)
    );
    setPokemons(filtered);
  };

  const handleClick = (pokemon) => {
    setPokemonData(pokemon.data);
    navigate('/profile');
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid container spacing={2}>
          {pokemons.map((pokemon, key) => (
            <Grid item xs={3} key={key}>
              <Box onClick={() => handleClick(pokemon)}>
                <PokemonCard
                  name={pokemon.data.name}
                  image={pokemon.data.sprites.front_default}
                  types={pokemon.data.types}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};