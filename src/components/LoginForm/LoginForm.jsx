import React from 'react';
import {
  Button, Title, PasswordInput, TextInput, Space, Container, Card,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { At, Lock } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { usernameExists, logIn } from '../../lib/users';

function LoginForm() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (username) => (!usernameExists(username) ? 'User does not exist' : null),
      password: (password, values) => (!usernameExists(values.username)
        ? 'Cannot check password' : !logIn(values.username, password)
          ? 'Invalid password'
          : null),
    },
    validateInputOnBlur: true,
  });
  const navigate = useNavigate();
  const submitHandler = ({ username, password }) => {
    if (logIn(username, password)) { navigate('/feed'); }
  };

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
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
