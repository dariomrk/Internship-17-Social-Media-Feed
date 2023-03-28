import {
  Button, Card, Collapse, Divider, Group, Stack, Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import NewPostForm from '../../components/NewPostForm';
import Post from '../../components/Post';
import { getPosts } from '../../lib/content';

function FeedPage() {
  const [posts, setPosts] = useState(getPosts());
  const [openedNewPost, { toggle: toggleNewPost }] = useDisclosure(false);
  useEffect(() => {
    // TODO
  }, [posts]);

  return (
    <Stack mt="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2}>Actions</Title>
        <Group mt="md" position="apart" spacing="sm">
          <Button color="red" variant="light">Log out</Button>
          <Group spacing="sm">
            <Button variant="light">My posts</Button>
            <Button onClick={toggleNewPost}>Create new post</Button>
          </Group>
        </Group>
      </Card>
      <Collapse in={openedNewPost}>
        <NewPostForm />
      </Collapse>
      {posts.map((post) => (
        <>
          <Post {...post} newCommentCallback={(text) => console.log(text)} />
          <Divider />
        </>
      ))}
    </Stack>
  );
}

export default FeedPage;
