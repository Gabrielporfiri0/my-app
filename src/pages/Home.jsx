import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PokemonCard from '../components/PokemonCard';
import { Container, Grid } from '@mui/material';
import axios from 'axios';

export const Home = () => {
    const [pokemons, setPokemons] = React.useState([]);
    useEffect   (() => {
        getPokemons();
    },[]);
    const getPokemons = () =>{
        var endpoints = []
        for(var i=1; i<=50; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
        console.log(response);
    };
    
    return (
        <div>
            <Navbar />
            <Container maxWidth="false">
                <Grid container>
                    {pokemons.map((pokemon, key)=><Grid item xs={3} key={key}>
                        <PokemonCard name={pokemon.data.name}  image={pokemon.data.sprites.front_default}  />
                     </Grid>
                    )}
                    

                </Grid>
             </Container>
        </div>
    );
}