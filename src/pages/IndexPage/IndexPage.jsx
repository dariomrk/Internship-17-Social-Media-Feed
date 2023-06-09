import {
  Container, Card, Button, Space, Title, Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserPlus } from 'tabler-icons-react';
import LoginForm from '../../components/LoginForm';
import SignUpForm from '../../components/SignUpForm';
import { canAutoLogIn } from '../../lib/users';

function IndexPage() {
  const [openedLogin, { open: openLogin, close: closeLogin }] = useDisclosure(false);
  const [openedSignup, { open: openSignup, close: closeSignup }] = useDisclosure(false);
  const navigate = useNavigate();
  const autoLogin = canAutoLogIn();

  useEffect(() => {
    if (autoLogin) { navigate('/feed'); }
  }, [autoLogin, navigate]);

  return (
    <>
      <Modal opened={openedLogin} onClose={closeLogin} centered fullScreen>
        <LoginForm />
      </Modal>
      <Modal opened={openedSignup} onClose={closeSignup} centered fullScreen>
        <SignUpForm />
      </Modal>
      <Container size="sm" p="lg">
        <Card shadow="sm" radius="md" withBorder>
          <Title align="center">Social Media Feed</Title>
          <Space h="lg" />
          <Button onClick={openLogin} fullWidth leftIcon={<User />}>
            Log in
          </Button>
          <Space h="sm" />
          <Button onClick={openSignup} fullWidth variant="light" leftIcon={<UserPlus />}>
            Sign up
          </Button>
        </Card>
      </Container>
    </>
  );
}

export default IndexPage;
