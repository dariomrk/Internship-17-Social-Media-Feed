import React from 'react';
import {
  Button, Title, PasswordInput, TextInput, Space, Container, Card,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { At, Lock } from 'tabler-icons-react';
import { addUser, usernameExists } from '../../lib/users';

function SignUpForm() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => (usernameExists(value) ? 'Username is taken' : null),
      password: (value) => (value.length < 8 ? 'Password is too short' : null),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
    },
  });

  // TODO submit handler
  const submitHandler = ({ username, password }) => {
    addUser(username, password);
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
