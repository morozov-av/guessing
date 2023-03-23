import {
  Button, Flex, FormControl, FormErrorMessage, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { borderGradient, paper, darkBlue } from '../../constants';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { Player } from '../../models/reduxModels';
import { getOrCreatePlayer } from '../../store/playerSlice';


type LoginModalProps = {
  isOpen: boolean,
  onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (form: { name: string }) => {
    void dispatch(getOrCreatePlayer(form.name))
      .unwrap()
      .then((p: Player ) => {
        onClose();
        toast({
          title: `Welcome, ${p.playerName}!`,
          status: 'success',
          isClosable: true,
          duration: 2000,
          position: 'top'
        });
      })
      .catch((e: Error) => {
        toast({
          title: e.message,
          status: 'error',
          isClosable: true,
          duration: 2000,
          position: 'top'
        });
      });
  };

  return(
    <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset='slideInBottom'>
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='30%'
        backdropBlur='2px'
      />
      <ModalContent bg={borderGradient}>
        <ModalHeader color={darkBlue}>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex pb={4} alignItems='flex-start' justifyContent='center'>
              <FormControl pr={2} isInvalid={!!errors.name}>
                <Input
                  borderWidth='1px' borderColor={darkBlue}
                  bgColor={paper}
                  id='name'
                  placeholder='Input your name'
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' }
                  })}
                />
                <FormErrorMessage>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                borderWidth='1px' borderColor={darkBlue}
                ml={1}
                isLoading={isSubmitting}
                type='submit'
                bgColor={paper}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
