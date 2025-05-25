import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';

export const Home = ({setPokemonData}) => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

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

  return (
    <div>
      <Navbar pokemonFilter={ pokemonFilter }/>
      <Container maxWidth="false">
        <Grid container spacing={2}>
          <Box onClick={ () => setPokemonData (pokemons.data) }/>
          {pokemons.map((pokemon, key) => (
            <Grid item xs={3} key={key}>
              <PokemonCard
                name={pokemon.data.name}
                image={pokemon.data.sprites.front_default}
                types={pokemon.data.types}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};