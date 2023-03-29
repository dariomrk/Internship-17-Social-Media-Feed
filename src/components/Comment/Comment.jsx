import { Card, Text } from '@mantine/core';
import React from 'react';

function Comment({ comment }) {
  return (
    <Card mt="sm" padding="lg" radius="md" withBorder>
      <Text>{comment.text}</Text>
    </Card>
  );
}

export default Comment;
