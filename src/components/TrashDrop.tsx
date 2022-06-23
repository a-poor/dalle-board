import React from 'react';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDroppable } from '@dnd-kit/core';

/** ID to use to reference TrashDrop for dndkit. */
export const trashDropID = "trash-drop";

/**
 * TrashDrop is a droppable location for deleting draggable frames.
 * If a user picks up a frame, this square will appear in the lower
 * right of the screen.
 */
export default function TrashDrop() {
  const { 
    active,
    isOver,
    setNodeRef,
  } = useDroppable({
    id: trashDropID,
  });
  return (
    <>
      <Grow in={active !== null}>
        <div 
          ref={setNodeRef}
          style={{
            width: isOver ? "200px" : "150px",
            height: isOver ? "200px" : "150px",
            border: isOver ? "3.5px dashed rgba(235,64,52,0.8)" : "2.5px dashed rgba(235,64,52,0.8)",
            backgroundColor: "rgba(235,64,52,0.3)",
            borderRadius: "15px",
            position: "fixed",
            right: 10,
            bottom: 10,
            color: "rgba(235,64,52,0.8)",
          }}
        >
          <div style={{ 
            margin: "auto", 
            marginTop: isOver ? "50px" : "40px",
            textAlign: "center"
          }}>
            <DeleteOutlineOutlinedIcon style={{
              fontSize: isOver ? "44px" : "24px"
            }}/>
            <Typography style={{
              fontWeight: "bold", 
              fontSize: isOver ? "22px" : "15px"
            }}>
              DELETE FRAME
            </Typography>
          </div>
        </div>
      </Grow>
    </>
  );
}
