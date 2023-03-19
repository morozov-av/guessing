import React, { FC } from 'react';
import { motion } from 'framer-motion';

const transition = { duration: 1, yoyo: Infinity, ease: 'easeInOut' };

export const Chart: FC = () => {
  return (
    <div style={{ width: '600px', height: '400px', overflow: 'hidden' }} className='container'>
      <svg xmlns="http://www.w3.org/2000/svg" width={'600px'} height={'400px'}>
        <motion.path
          d="M30,370 C 400,370 500,319 570,30"
          fill="transparent"
          strokeWidth="12"
          stroke="rgba(255, 255, 255, 0.69)"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={transition}
        />
      </svg>
      <motion.div
        className="box"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={transition}
      />
    </div>
  );
};
