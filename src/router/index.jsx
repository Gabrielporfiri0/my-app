import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import React, { useState } from 'react';

export const AppRouter = () => {
  const [pokemonData, setPokemonData] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setPokemonData={setPokemonData} />} />
        <Route path="/profile" element={<Profile pokemonData={pokemonData} />} />
      </Routes>
    </BrowserRouter>
  );
};