import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function LoadingFrameGen() {
  // Store the state of if frames are being generated.
  const [isGenerating, setIsGenerating] = useState(false);

  // // Fetch the data...
  // const { isLoading, error, data } = useQuery(
  //   'genImages', 
  //   () => generateImages({ prompt })
  // );

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
    </>
  );
}
