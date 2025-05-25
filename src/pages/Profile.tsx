import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

interface PokemonType {
  type: { name: string };
}

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  height: number;
  weight: number;
}

interface ProfileProps {
  pokemonData: PokemonData | null;
}

export const Profile: React.FC<ProfileProps> = ({ pokemonData }) => {
  if (!pokemonData) {
    return (
      <>
        <Navbar hideSearch />
        <Typography variant="h6" textAlign="center" mt={4}>
          Nenhum Pokémon selecionado.
        </Typography>
      </>
    );
  }

  return (
    <>
      <Navbar hideSearch />
      <Box display="flex" justifyContent="center" mt={5}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="200"
            image={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
          <CardContent>
            <Typography variant="h5">{pokemonData.name.toUpperCase()}</Typography>
            <Typography variant="body1">
              Tipo: {pokemonData.types.map((t) => t.type.name).join(', ')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Altura: {pokemonData.height} | Peso: {pokemonData.weight}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
