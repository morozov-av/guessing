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
import React, { FC, useEffect } from 'react';
import { mint } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getAllPlayers } from '../../store/playerSlice';
import Filter1Icon from '@mui/icons-material/Filter1';

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
    <TableContainer w='100%' h='100%' overflowX="unset" overflowY="unset">
      <Table size='sm' variant='striped' colorScheme='teal'>
        <Thead bg={mint} position='sticky' top='0px' zIndex="docked">
          <Tr borderBottomWidth={1}>
            <Th border='none' display='flex' alignItems='center'>
              <Filter1Icon />
              <Text ml={2} >Ranking</Text>
            </Th>
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
                <Td maxW='15em' overflow='hidden' textOverflow='ellipsis' >{player.playerName}</Td>
                <Td isNumeric>{player.points}</Td>
              </MotionTr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
