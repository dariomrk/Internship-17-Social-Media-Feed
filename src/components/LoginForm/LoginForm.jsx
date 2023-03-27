import React from 'react';
import {
  Button, Card, PasswordInput, TextInput, Space, Container, Title,
} from '@mantine/core';

function LoginForm() {
  return (
    <Container size="sm">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2}>Log in</Title>
        <TextInput label="Username" placeholder="Your username" />
        <PasswordInput label="Password" placeholder="Your password" />
        <Space h="lg" />
        <Button>Log in</Button>
      </Card>
    </Container>
  );
}

export default LoginForm;
