import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';

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

export const AppRouter: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setPokemonData={setPokemonData} />} />
        <Route path="/profile" element={<Profile pokemonData={pokemonData} />} />
      </Routes>
    </BrowserRouter>
  );
};
