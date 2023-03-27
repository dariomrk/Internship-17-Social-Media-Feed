import React from 'react';
import {
  Button, Title, PasswordInput, TextInput, Space, Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { At, Lock } from 'tabler-icons-react';

function SignUpForm() {
  const form = useForm({});

  // TODO submit handler

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack spacing="xs">
        <Title>Sign up</Title>
        <TextInput icon={<At />} required label="Username" placeholder="Your shiny new username" {...form.getInputProps('username')} />
        <PasswordInput icon={<Lock />} required label="Password" placeholder="Your strong password to be" {...form.getInputProps('password')} />
        <PasswordInput icon={<Lock />} required label="Confirm password" placeholder="Do you remember your new password from just like, 3 seconds ago?" {...form.getInputProps('confirmPassword')} />
        <Space h="lg" />
        <Button type="submit">Sign up</Button>
      </Stack>
    </form>
  );
}

export default SignUpForm;
