import {
  Container, Card, Button, Space, Title, Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { User, UserPlus } from 'tabler-icons-react';

function IndexPage() {
  const [openedLogin, { open: openLogin, close: closeLogin }] = useDisclosure(false);
  const [openedSignup, { open: openSignup, close: closeSignup }] = useDisclosure(false);

  return (
    <>
      <Modal opened={openedLogin} onClose={closeLogin} centered fullScreen>
        <Title>Login</Title>
      </Modal>
      <Modal opened={openedSignup} onClose={closeSignup} centered fullScreen>
        <Title>Sign up</Title>
      </Modal>
      <Container size="sm">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
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
