import { GridItemProps } from '@chakra-ui/layout/dist/grid-item';
import { GridItem as ChakraGridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { borderGradient } from '../constants';

export const GridItem: FC<GridItemProps> = (props) =>
  <ChakraGridItem
    overflow='hidden'
    display='flex'
    alignItems='center'
    justifyContent='center'
    bg={borderGradient}
    borderWidth={4}
    borderStyle='solid'
    sx={
      {
        '::-webkit-scrollbar':{
          display:'none'
        }
      }
    }
    {...props}
  >
    {props.children}
  </ChakraGridItem>;
