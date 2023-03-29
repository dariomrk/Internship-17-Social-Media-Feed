import {
  Card, Title, Stack, Group, Button,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBackUp, DoorExit, Edit, Eraser,
} from 'tabler-icons-react';
import Post from '../../components/Post';
import { getPost } from '../../lib/content';
import { canAutoLogIn, clearLastLoggedIn } from '../../lib/users';

function PostPage() {
  const navigate = useNavigate();
  const isValidLogin = canAutoLogIn();
  const { id } = useParams();
  const [post, setPost] = useState(getPost(Number(id)));

  useEffect(() => {
    if (!isValidLogin) {
      navigate('/');
    }
  }, [isValidLogin, navigate]);

  useEffect(() => {
    if (!post) {
      navigate('/not-found');
    }
  }, [post, navigate]);

  return (
    <Stack mt="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>Post</Title>
        <Group mt="md" position="apart" spacing="sm">
          <Group>
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
            <Button
              leftIcon={<ArrowBackUp />}
            >
              Feed
            </Button>
          </Group>
          <Group>
            <Button leftIcon={<Edit />}>Edit post</Button>
            <Button color="red" leftIcon={<Eraser />}>Delete post</Button>
          </Group>
        </Group>
      </Card>
      <Post {...post} />
    </Stack>
  );
}

export default PostPage;
