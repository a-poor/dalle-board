import React from 'react';
import Paper from '@mui/material/Paper';

export interface ICardPlaceholderProps {
  width?: string;
  height?: string;
}

/**
 * CardPlaceholder represents the styling of the placeholder
 * that remains in the storyboard while the card is being
 * dragged (via the dndkit library).
 */
export default function CardPlaceholder({width="100%", height="100%"}: ICardPlaceholderProps) {
  return (
    <Paper
      variant="outlined"
      style={{
        width,
        height,
        backgroundColor: "rgba(230,230,230, 0.6)",
      }}
    />
  );
}
