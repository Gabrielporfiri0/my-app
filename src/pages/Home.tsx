import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Box, Container} from '@mui/material';
import { Grid } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

interface PokemonType {
  type: { name: string };
}

export interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  height: number;
  weight: number;
}

interface HomeProps {
  setPokemonData: React.Dispatch<React.SetStateAction<PokemonData | null>>;
}

export const Home: React.FC<HomeProps> = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState<AxiosResponse<PokemonData>[]>([]);
  const [allPokemons, setAllPokemons] = useState<AxiosResponse<PokemonData>[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    const endpoints = Array.from({ length: 100 }, (_, i) => `https://pokeapi.co/api/v2/pokemon/${i + 1}/`);
    try {
      const responses = await axios.all(endpoints.map((endpoint) => axios.get<PokemonData>(endpoint)));
      setPokemons(responses);
      setAllPokemons(responses);
    } catch (error) {
      console.error('Erro ao buscar os pokémons:', error);
    }
  };

  const pokemonFilter = (name: string) => {
    if (name === '') {
      setPokemons(allPokemons);
      return;
    }
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.data.name.includes(name)
    );
    setPokemons(filtered);
  };

  const handleClick = (pokemon: AxiosResponse<PokemonData>) => {
    setPokemonData(pokemon.data);
    navigate('/profile');
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          {pokemons.map((pokemon, key) => (
            <Grid key={key}>
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
