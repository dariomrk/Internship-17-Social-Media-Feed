import {
  Button, Card, Collapse, Divider, Group, Stack, Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { DoorExit, PencilPlus } from 'tabler-icons-react';
import NewPostForm from '../../components/NewPostForm';
import Post from '../../components/Post';
import { addPost, getPosts } from '../../lib/content';
import { getLastLoggedIn } from '../../lib/users';

function FeedPage() {
  const [posts, setPosts] = useState(getPosts());
  const [openedNewPost, { toggle: toggleNewPost }] = useDisclosure(false);

  return (
    <Stack mt="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2}>Actions</Title>
        <Group mt="md" position="apart" spacing="sm">
          <Button leftIcon={<DoorExit />} color="red" variant="light">Log out</Button>
          <Group spacing="sm">
            <Button variant="light">My posts</Button>
            <Button leftIcon={<PencilPlus />} onClick={toggleNewPost}>Create new post</Button>
          </Group>
        </Group>
      </Card>
      <Collapse in={openedNewPost}>
        <NewPostForm newPostCallback={({ text, image }) => {
          addPost({ text, image, createdBy: getLastLoggedIn() });
          setPosts(getPosts());
          toggleNewPost(false);
        }}
        />
      </Collapse>
      {posts.map((post) => (
        <>
          <Post
            key={post.id}
            {...post}
            newCommentCallback={(text) => console.log(text)}
          />
          <Divider key={crypto.randomUUID()} />
        </>
      ))}
    </Stack>
  );
}

export default FeedPage;
