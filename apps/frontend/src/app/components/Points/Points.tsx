import { StarIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { darkBlue } from '../../constants';
import { useAppSelector } from '../../hooks/reduxHooks';

const MotionFlex = motion(Flex);

export const Points = () => {
  const points = useAppSelector(state => state.player.currentPlayer.points);

  return(
    <MotionFlex
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      h='100%'
      alignItems='center'
      justifyItems='center'
      color={darkBlue}
      padding={1}
    >
      <StarIcon paddingRight={1} boxSize={5} />
      <Text>{points || '-'}</Text>
    </MotionFlex>
  );
};
