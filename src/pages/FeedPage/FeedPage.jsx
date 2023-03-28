import {
  Button, Card, Collapse, Divider, Group, Stack, Title,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  PencilMinus, DoorExit, PencilPlus,
} from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import NewPostForm from '../../components/NewPostForm';
import Post from '../../components/Post';
import { addPost, getPosts, removePost } from '../../lib/content';
import { canAutoLogIn, clearLastLoggedIn, getLastLoggedIn } from '../../lib/users';

function FeedPage() {
  const [posts, setPosts] = useState(getPosts());
  const [openedNewPost, { toggle: toggleNewPost }] = useDisclosure(false);
  const navigate = useNavigate();
  const isValidLogin = canAutoLogIn();

  useEffect(() => {
    if (!isValidLogin) {
      navigate('/');
    }
  }, [isValidLogin, navigate]);

  return (
    <Stack mt="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2}>Actions</Title>
        <Group mt="md" position="apart" spacing="sm">
          <Button
            leftIcon={<DoorExit />}
            color="red"
            variant="light"
            onClick={() => {
              clearLastLoggedIn();
              navigate('/');
            }}
          >
            Log out
          </Button>
          <Group spacing="sm">
            <Button variant="light">My posts</Button>
            {(!openedNewPost
              ? (
                <Button
                  leftIcon={<PencilPlus />}
                  onClick={toggleNewPost}
                >
                  Create new post
                </Button>
              )
              : (
                <Button
                  color="red"
                  leftIcon={<PencilMinus />}
                  onClick={toggleNewPost}
                >
                  Close create new post
                </Button>
              ))}
          </Group>
        </Group>
      </Card>
      <Collapse in={openedNewPost}>
        <NewPostForm
          newPostCallback={({ text, image }) => {
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
            removePostCallback={(id) => {
              removePost(id);
              setPosts(getPosts());
            }}
          />
          <Divider key={crypto.randomUUID()} />
        </>
      ))}
    </Stack>
  );
}

export default FeedPage;
