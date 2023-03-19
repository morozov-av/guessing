import { GridItemProps } from '@chakra-ui/layout/dist/grid-item';
import { GridItem as ChakraGridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { orange, paper, tomato } from '../constants';


const borderGradient = `linear-gradient(${orange}, ${tomato}) padding-box,linear-gradient(to right, ${orange}, ${paper}) border-box`;
export const GridItem: FC<GridItemProps> = (props) =>
  <ChakraGridItem
    overflow='hidden'
    display='flex'
    alignItems='center'
    justifyContent='center'
    bg={borderGradient}
    borderWidth={4}
    borderStyle='solid'
    borderIma
    {...props}
  >
    {props.children}
  </ChakraGridItem>;
