import { FC, useEffect, useRef } from 'react';
import { Avatar, Flex, Text } from '@chakra-ui/react';
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
                bg="black"
                color="white"
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
              <Avatar
                name="Computer"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
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
