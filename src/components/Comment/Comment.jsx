import {
  Card, Text, Group, Badge, Button,
} from '@mantine/core';
import React from 'react';
import { Eraser } from 'tabler-icons-react';
import { getLastLoggedIn } from '../../lib/users';

function Comment({ postId, comment, removeCommentCallback }) {
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
      <Group position="apart" mt="sm">
        <Text mt="sm">
          {comment.text}
        </Text>
        {(comment.createdBy === getLastLoggedIn()
          ? <Button onClick={() => { removeCommentCallback(postId, comment.id); }} variant="light" color="red" leftIcon={<Eraser />}>Delete</Button>
          : undefined)}
      </Group>

    </Card>
  );
}

export default Comment;
