import { ChangeEvent, FC, useState } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

interface PasswordModalProps {
  id: string;
  callback: (pw: string) => void;
  cancel: () => void;
  name: string;
  status: number;
}

export const PasswordModal: FC<PasswordModalProps> = ({
  id,
  callback,
  cancel,
  name,
}) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const handleShowChange = () => setShow(!show);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = () => {
    callback(password);
  };

  return (
    <Modal isOpen={true} onClose={cancel} key={id}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t(`This file requires a password`)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>{name}</Text>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder={t('Enter password')}
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleShowChange}>
                {show ? t('Hide') : t('Show')}
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onSubmit}>{t('Unlock')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
