import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function Ratings({ rating, starSize }) {
  const scaledRating = (rating / 5) * 5;

  const [hover, setHover] = React.useState(-1);

  const customStyles = {
    fontSize: starSize, // Set the desired font size for both filled and empty stars
    '& .MuiRating-iconFilled': {
      fontSize: "small", // Set the font size for filled stars
    },
    '& .MuiRating-iconEmpty': {
      fontSize: "small", // Set the font size for empty stars
    },
  };

  return (
    <Box sx={customStyles}>
      <Rating
        name="hover-feedback"
        value={scaledRating}
        precision={0.5}
        readOnly
        onChangeActive={(event, newHover) => { 
            setHover(newHover);
         }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}
