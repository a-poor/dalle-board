import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { useQuery } from 'react-query';

import { IFrameData } from '../types';
import { generateImages, IAPIResponse } from '../api';


export interface IEditFrameGenProps {
  prompt?: string;
  desc?: string;
  setPrompt: (prompt: string) => void;
  setImg: (img: string) => void;
}

export default function EditFrameGen({prompt, desc, setPrompt, setImg}: IEditFrameGenProps) {
  // Store the state of if frames are being generated.
  const [isGenerating, setIsGenerating] = useState(false);

  let error: unknown;
  let isLoading = false;
  let data: IAPIResponse | undefined = undefined;

  // Fetch the data...
  const fetchData = () => {
    const res = useQuery(
      'genImages', 
      () => generateImages({ prompt })
    );
    isLoading = res.isLoading;
    error = res.error;
    data = res.data;
  };

  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const getStyles = (selected: boolean, hovered: boolean) => {
    if (selected) return {
      border: "3px solid rgba(85, 149, 245, 1.0)",
    };
    if (hovered) return {
      border: "3px solid rgba(85, 149, 245, 0.5)",
    };
    return {
      border: "3px solid transparent",
    };
  };

  return (
    <>
      <DialogContent>
        <div>
          <Grid 
            container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            rowSpacing={2} 
            columnSpacing={1}
            style={{
              width: "500px",
              margin: "auto",
            }}
          >
            {
              new Array(9)
                .fill(0)
                .map((_, i) => (
                  <Grid 
                    item 
                    xs={4} 
                    key={i}
                    // height={150} 
                    width={150}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(undefined)}
                    onClick={() => {
                      if (selected === i) {
                        setSelected(undefined);
                      } else {
                        setSelected(i);
                      }
                    }}
                  >
                    <Skeleton
                      onClick={() => console.log(i)}
                      animation={false}
                      variant="rectangular" 
                      height={150} 
                      width={150}
                      style={{
                        margin: "auto",
                        ...getStyles(
                          selected === i,
                          hovered === i,
                        )
                      }}
                    />
                  </Grid>
                ))
            }
          </Grid>
        </div>
      </DialogContent>
    </>
  );
}