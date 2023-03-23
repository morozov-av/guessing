import { TimeIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import  React, { useState , useEffect } from 'react';
import { darkBlue } from '../../constants';

export const Time = () => {
  const [ date,setDate ] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(()=>setDate(new Date()), 1000 );
    return () => clearInterval(timer);
  });

  return(
    <Flex h='100%' alignItems='center' justifyItems='center' color={darkBlue} padding={1}>
      <TimeIcon paddingRight={1} boxSize={5} />
      <Text>{date.toLocaleTimeString()}</Text>
    </Flex>
  );
};
