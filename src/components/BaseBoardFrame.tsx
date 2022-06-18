import React from 'react';
import Card from '@mui/material/Card';

export interface IBaseBoardFrameProps {
  children?: React.ReactNode;
}

export default function BaseBoardFrame({children}: IBaseBoardFrameProps) {
  return (
    <>
      <Card sx={{maxWidth: "350px"}}>
        { children }
      </Card>
    </>
  );
}
