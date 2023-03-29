import {
  Card, Title, Stack, Group, Button,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowBackUp, DoorExit, Eraser,
} from 'tabler-icons-react';
import Post from '../../components/Post';
import {
  addComment, getPost, removeComment, removePost,
} from '../../lib/content';
import { canAutoLogIn, clearLastLoggedIn, getLastLoggedIn } from '../../lib/users';

function PostPage() {
  const navigate = useNavigate();
  const isValidLogin = canAutoLogIn();
  const { id } = useParams();
  const [post, setPost] = useState(getPost(id));

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
              onClick={() => {
                navigate('/feed');
              }}
            >
              Feed
            </Button>
          </Group>
          {(post !== null && post.createdBy === getLastLoggedIn() ? (
            <Group>
              <Button
                color="red"
                leftIcon={<Eraser />}
                onClick={() => {
                  removePost(post.id);
                  navigate('/feed');
                }}
              >
                Delete post

              </Button>
            </Group>
          ) : undefined)}
        </Group>
      </Card>
      <Post
        newCommentCallback={(text) => {
          addComment(post.id, { createdBy: getLastLoggedIn(), text });
          setPost(getPost(post.id));
        }}
        removeCommentCallback={(postId, commentId) => {
          removeComment(postId, commentId);
          setPost(getPost(postId));
        }}
        {...post}
      />
    </Stack>
  );
}

export default PostPage;
