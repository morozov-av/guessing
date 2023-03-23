import React, { FC } from 'react';

export const Axis: FC = () => {
  const getX = (i: number): number => 20 + 60 * i;
  const labels = Array.from({ length: 10 }, (_, i) => {
    const x = getX(i);
      return (
        <text
          key={x}
          fill="rgba(255, 255, 255, 0.69)"
          x={x}
          y="395"
        >
          {i + 1}
        </text>
      );
    }
  );
  return (
    <>
      <path
        d="M23,370 H567 M25,370 V380 M85,370 V380 M145,370 V380 M205,370 V380 M265,370 V380 M325,370 V380 M385,370 V380 M445,370 V380 M505,370 V380 M565,370 V380"
        fill="transparent"
        strokeWidth="4"
        stroke="rgba(255, 255, 255, 0.69)"
      />
      {labels}
    </>
  );
};
