import React from 'react';
import {
  Button, Title, PasswordInput, TextInput, Space, Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { At, Lock } from 'tabler-icons-react';

function LoginForm() {
  const form = useForm({});

  // TODO submit handler

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack spacing="xs">
        <Title>Login</Title>
        <TextInput icon={<At />} required label="Username" placeholder="Your unique username" {...form.getInputProps('username')} />
        <PasswordInput icon={<Lock />} required label="Password" placeholder="From a password manager, I hope" {...form.getInputProps('password')} />
        <Space h="lg" />
        <Button type="submit">Log in</Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
