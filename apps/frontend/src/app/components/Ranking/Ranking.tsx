import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { FC, useEffect } from 'react';
import { tomato } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getAllPlayers } from '../../store/playerSlice';

const MotionTr = motion(Tr);
const spring = {
  type: 'spring',
  damping: 25,
  stiffness: 120
};

export const Ranking: FC = () => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector(state => state.player.allPlayers);

  useEffect(() => {
    void dispatch(getAllPlayers());
  }, [ dispatch ]);

  return(
    <TableContainer h='100%' overflowX="unset" overflowY="unset">
      <Table size='sm' variant='striped' colorScheme='teal'>
        <Thead bg={tomato} position='sticky' top='0px' zIndex="docked">
          <Tr>
            <Th border='none'>Ranking</Th>
            <Th border='none'></Th>
            <Th border='none'></Th>
          </Tr>
          <Tr>
            <Th>Place</Th>
            <Th>Name</Th>
            <Th isNumeric>Score</Th>
          </Tr>
        </Thead>

        <Tbody>
          {players.map((player, index) => {
            return (
              <MotionTr
                layout
                key={player.playerName}
                transition={spring}
              >
                <Td>{index + 1}</Td>
                <Td>{player.playerName}</Td>
                <Td isNumeric>{player.points}</Td>
              </MotionTr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
