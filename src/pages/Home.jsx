import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Container, Grid } from '@mui/material';
import axios from 'axios';

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    const endpoints = [];
    for (let i = 1; i <= 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    try {
      const responses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
      setPokemons(responses);
    } catch (error) {
      console.error('Erro ao buscar os pokémons:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="false">
        <Grid container spacing={2}>
          {pokemons.map((pokemon, key) => (
            <Grid item xs={3} key={key}>
              <PokemonCard
                name={pokemon.data.name}
                image={pokemon.data.sprites.front_default} // <- CORREÇÃO AQUI
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};