import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


export interface IEditFramePageProps {
  id?: string;
}

export default function EditFramePage() {
  const navigate = useNavigate();
  const { frameId } = useParams();

  useEffect(() => {
    console.log(`Navigating to frame: ${frameId}`);
    if (!frameId) navigate("/");
  }, [frameId]);
  return (
    <>
      {frameId}
    </>
  );
}
