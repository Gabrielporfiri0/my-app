import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function PokemonCard({ name, image }) {
  return (
    <Card
      sx={{
        width: 150,
        height: 200,
        margin: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: 96,
          width: 96,
          objectFit: 'contain',
          marginTop: 2,
        }}
      />
      <CardContent sx={{ padding: 1 }}>
        <Typography
          variant="subtitle1"
          component="div"
          textAlign="center"
          textTransform="capitalize"
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}