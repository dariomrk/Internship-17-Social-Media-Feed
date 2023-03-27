import React from 'react';
import {
  Button, Title, PasswordInput, TextInput, Space, Container, Card,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { At, Lock } from 'tabler-icons-react';
import { usernameExists, logIn } from '../../lib/users';

function LoginForm() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (username) => (!usernameExists(username) ? 'User does not exist' : null),
      password: (password, values) => (!logIn(values.username, password) ? 'Invalid password' : null),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Container size="sm">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title>Login</Title>
          <TextInput icon={<At />} required label="Username" placeholder="Your unique username" {...form.getInputProps('username')} />
          <PasswordInput icon={<Lock />} required label="Password" placeholder="From a password manager, I hope" {...form.getInputProps('password')} />
          <Space h="lg" />
          <Button type="submit">Log in</Button>
        </Card>
      </Container>
    </form>
  );
}

export default LoginForm;
