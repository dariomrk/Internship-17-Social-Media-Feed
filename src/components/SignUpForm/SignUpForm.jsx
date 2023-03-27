import React from 'react';
import {
  Button, Title, PasswordInput, TextInput, Space, Container, Card,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { At, Lock } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { addUser, usernameExists, logIn } from '../../lib/users';

function SignUpForm() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (username) => (
        username.trim().length < 4
          ? 'Username is too short'
          : usernameExists(username)
            ? 'Username is taken'
            : null),
      password: (password) => (password.length < 8 ? 'Password is too short' : null),
      confirmPassword: (confirmPassword, values) => (confirmPassword !== values.password ? 'Passwords do not match' : null),
    },
    validateInputOnBlur: true,
  });
  const navigate = useNavigate();

  const submitHandler = ({ username, password }) => {
    addUser(username, password);
    logIn(username, password);
    navigate('/feed');
  };

  return (
    <form onSubmit={form.onSubmit(submitHandler)}>
      <Container size="sm">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title>Sign up</Title>
          <TextInput icon={<At />} required label="Username" placeholder="Your shiny new username" {...form.getInputProps('username')} />
          <PasswordInput icon={<Lock />} required label="Password" placeholder="Your strong password to be" {...form.getInputProps('password')} />
          <PasswordInput icon={<Lock />} required label="Confirm password" placeholder="Do you remember your new password from just like, 3 seconds ago?" {...form.getInputProps('confirmPassword')} />
          <Space h="lg" />
          <Button type="submit">Sign up</Button>
        </Card>
      </Container>
    </form>
  );
}

export default SignUpForm;
