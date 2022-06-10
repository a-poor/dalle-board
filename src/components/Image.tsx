import React from 'react';

const defaultImgSize = 256;

export interface IImageProps {
  b64img: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: {[key: string]: any};
}

export default function Image({b64img, alt, width, height, style}: IImageProps) {
  return (
    <img 
      src={`data:image/png;base64, ${b64img}`}
      alt={alt}
      width={width || defaultImgSize}
      height={height || defaultImgSize}
      style={{...(style || {})}}
    />
  );
}