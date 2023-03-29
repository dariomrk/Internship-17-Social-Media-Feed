import React from 'react';
import {
  Title, Text, Button, Group, Stack,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { Poo } from 'tabler-icons-react';

function NotFoundPage() {
  const { height } = useViewportSize();
  const navigate = useNavigate();
  return (
    <Stack justify="center" align="center" h={height}>
      <Group>
        <Poo size={42} />
        <Title>Uh oh! 404</Title>
      </Group>
      <Text color="dimmed" size="lg" align="center">
        In this reality, the URL you searched for does not exist.
      </Text>
      <Button
        onClick={() => {
          navigate('/');
        }}
        variant="subtle"
        size="md"
      >
        Take me back
      </Button>
    </Stack>
  );
}

export default NotFoundPage;
