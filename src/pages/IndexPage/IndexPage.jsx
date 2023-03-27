import {
  Container, Card, Button, Space, Title,
} from '@mantine/core';
import React from 'react';
import { User, UserPlus } from 'tabler-icons-react';

function IndexPage() {
  return (
    <Container size="sm">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title align="center">Social Media Feed</Title>
        <Space h="lg" />
        <Button fullWidth leftIcon={<User />}>
          Log in
        </Button>
        <Space h="sm" />
        <Button fullWidth variant="light" leftIcon={<UserPlus />}>
          Sign up
        </Button>
      </Card>
    </Container>
  );
}

export default IndexPage;
