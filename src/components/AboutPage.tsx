import React from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export default function AboutPage() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        About DALL-E Board
      </Typography>
      <Skeleton 
        variant="rectangular" 
        style={{
          margin: "auto",
          width: "850px",
          height: "450px",
        }}
      />
      <Typography variant="caption" gutterBottom>
        {'This is an image caption describing the above image. Not sure what it is yet...'}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {"This is the text of the about page and it has the about page info and I'm not sure what THAT will"}
        {"be yet but this is where it will be when I figure it out."}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {"In the meantime, though, this is some placeholder text and it is taking up space so that I"}
        {"can see what the about page will look like."}
      </Typography>
      <Typography variant="body1" gutterBottom>
        That is all for now.
      </Typography>
    </>
  );
}
