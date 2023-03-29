import {
  Button, Card, Collapse, Divider, Group, Stack, Title,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  PencilMinus, DoorExit, PencilPlus,
} from 'tabler-icons-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NewPostForm from '../../components/NewPostForm';
import Post from '../../components/Post';
import {
  addComment,
  addPost, filterPosts, sortedPosts,
} from '../../lib/content';
import { canAutoLogIn, clearLastLoggedIn, getLastLoggedIn } from '../../lib/users';

function FeedPage() {
  const [posts, setPosts] = useState(sortedPosts());
  const [openedNewPost, { toggle: toggleNewPost }] = useDisclosure(false);
  const navigate = useNavigate();
  const isValidLogin = canAutoLogIn();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!isValidLogin) {
      navigate('/');
    }
  }, [isValidLogin, navigate]);

  useEffect(() => {
    setPosts(filterPosts(sortedPosts(), searchParams.get('search') ?? ''));
  }, [searchParams]);

  return (
    <Stack mt="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>Feed</Title>
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
            setPosts(sortedPosts());
            toggleNewPost(false);
          }}
        />
      </Collapse>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <Post
            {...post}
            newCommentCallback={(text) => {
              addComment(post.id, { createdBy: getLastLoggedIn(), text });
              setPosts(sortedPosts());
            }}
            showMoreButton
          />
          <Divider />
        </React.Fragment>
      ))}
    </Stack>
  );
}

export default FeedPage;
