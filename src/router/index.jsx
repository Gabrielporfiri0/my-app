import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import React, { useEffect, useState } from 'react';

export const AppRouter = () => {
    const [pokemonData, setPokemons] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile pokemonData={pokemonData} />} />
      </Routes>
    </BrowserRouter>
  );
};