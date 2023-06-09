import {
  Table,
  TableContainer,
  Tbody,
  Td, Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { mint } from '../../constants';
import { useAppSelector } from '../../hooks/reduxHooks';
import CasinoIcon from '@mui/icons-material/Casino';

const MotionTr = motion(Tr);
const spring = {
  type: 'spring',
  damping: 25,
  stiffness: 120
};

export const CurrentRound: FC = () => {
  const bids = useAppSelector(state => state.round.bids);

  return(
      <TableContainer w='100%' h='100%' overflowX="unset" overflowY="unset">
        <Table size='sm' variant='striped' colorScheme='teal'>
          <Thead bg={mint} position='sticky' top='0px' zIndex="docked">
            <Tr borderBottomWidth={1}>
              <Th border='none' display='flex' alignItems='center'>
                <CasinoIcon />
                <Text ml={1} >Current Round</Text>
              </Th>
              <Th border='none'></Th>
              <Th border='none'></Th>
            </Tr>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Bid</Th>
              <Th isNumeric>Multiplier</Th>
            </Tr>
          </Thead>

          <Tbody>
            {bids.map((bid) => {
              return (
                <MotionTr
                  layout
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  key={bid.playerName}
                  transition={spring}
                >
                  <Td>{bid.playerName}</Td>
                  <Td isNumeric>{bid.amount}</Td>
                  <Td isNumeric>{bid.multiplier}</Td>
                </MotionTr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
  );
};
