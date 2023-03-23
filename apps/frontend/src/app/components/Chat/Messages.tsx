import { FC, useEffect, useRef } from 'react';
import { Divider, Flex, Text } from '@chakra-ui/react';
import { darkBlue, lightWheat, platinum } from '../../constants';
import { Message } from '../../types';

const AlwaysScrollToBottom: FC = () => {
  const elementRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => elementRef?.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }));
  return <div ref={elementRef} />;
};

type MessagesProps = {
  playerName: string | null,
  messages: Message[]
}

export const Messages: FC<MessagesProps> = ({ messages, playerName }) => {
  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.playerName === playerName) {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg={platinum}
                borderRadius='1em'
                borderTopRightRadius='none'
                color={darkBlue}
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.message}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Flex
                bg={lightWheat}
                borderRadius='1em'
                borderTopLeftRadius='none'
                color={darkBlue}
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                direction='column'
              >
                <Text fontSize={12} fontWeight='bold' pr='.5em' color={darkBlue}>{`${item.playerName}:`}</Text>
                <Divider />
                <Text>{item.message}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
};
