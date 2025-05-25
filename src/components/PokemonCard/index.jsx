import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface PokemonsCard {
  name: string;
  image: string;
  types: Array<{ type: { name: string } }>;
}

export default function PokemonCard({ name, image, types }: PokemonsCard) {
  const typeHandler = () => {
    if (types.length > 1) {
      return `${types[0].type.name} / ${types[1].type.name}`;
    }
    return types[0].type.name;
  };

  return (
    <Card
      sx={{
        width: 250,
        height: 230,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
        sx={{ objectFit: 'contain', backgroundColor: '#f2f2f2' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {typeHandler()}
        </Typography>
      </CardContent>
    </Card>
  );
}
