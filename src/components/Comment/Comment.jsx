import {
  Card, Text, Group, Badge,
} from '@mantine/core';
import React from 'react';
import { getLastLoggedIn } from '../../lib/users';

function Comment({ comment }) {
  return (
    <Card mt="sm" padding="sm" radius="md" withBorder>
      <Group position="apart">
        <Text weight={500}>
          {comment.createdBy}
        </Text>
        <Group>
          {(getLastLoggedIn() === comment.createdBy ? <Badge color="pink" variant="filled">My comment</Badge> : undefined)}
          <Badge>{new Date(comment.timestamp).toLocaleString('en-US')}</Badge>
        </Group>
      </Group>
      <Text mt="sm">
        {comment.text}
      </Text>
    </Card>
  );
}

export default Comment;
