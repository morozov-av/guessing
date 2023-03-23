import React, { FC } from 'react';

export const Axis: FC = () => {
  return (
    <>
      <path
        d="M23,370 H567 M25,370 V380 M565,370 V380"
        fill="transparent"
        strokeWidth="4"
        stroke="rgb(94, 96, 115, 0.69)"
      />
      <text
        fill="rgb(94, 96, 115, 0.69)"
        x="22"
        y="395"
      >
        1
      </text>
      <text
        fill="rgb(94, 96, 115, 0.69)"
        x="557"
        y="395"
      >
        10
      </text>
    </>
  );
};
