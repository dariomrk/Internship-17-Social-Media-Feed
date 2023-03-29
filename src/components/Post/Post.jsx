import {
  Card, Image, Text, Badge, Button, Group, Collapse, Title,
} from '@mantine/core';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import Comment from '../Comment';
import NewCommentForm from '../NewCommentForm';
import { getLastLoggedIn } from '../../lib/users';

/**
 * @param {{
 * id: number,
 * image: string,
 * text: string,
 * createdBy: string,
 * timestamp: string,
 * comments: {
 *  text: string,
 *  createdBy: string,
 *  timestamp: string,
 * }[],
 * newCommentCallback: (text: string) => void,
 * }} props
 * @returns {JSX.ELement}
 */
function Post({
  id,
  image,
  text,
  createdBy,
  timestamp,
  comments = [],
  newCommentCallback,
}) {
  const [commentsOpened, { toggle: toggleComments }] = useDisclosure(false);
  const [newCommentOpened, { toggle: toggleNewComment }] = useDisclosure(false);
  const navigate = useNavigate();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {(!image
          ? undefined
          : (
            <Image
              src={image}
              height={(!image ? 400 : 'fit-content')}
              alt="Post image"
            />
          ))}
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{createdBy ?? 'Anonymous'}</Text>
        <Group>
          {(getLastLoggedIn() === createdBy ? <Badge color="pink" variant="filled">My post</Badge> : undefined)}
          {(!image ? <Badge color="red">No image</Badge> : undefined)}
          <Badge>
            {comments.length}
            {' '}
            {comments.length === 1 ? 'comment' : 'comments'}
          </Badge>
          <Badge>
            {new Date(timestamp).toLocaleString('en-US')}
          </Badge>
        </Group>
      </Group>
      <Text size="sm" color="dimmed">
        {text ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
      </Text>
      <Group position="apart" mt="md">
        <Button
          variant="light"
          color="blue"
          radius="md"
          onClick={() => {
            navigate(`/post/${id}`);
          }}
        >
          More
        </Button>
        <Group position="left">
          <Button
            disabled={comments.length === 0}
            variant="light"
            color="blue"
            radius="md"
            onClick={toggleComments}
          >
            See comments
          </Button>
          <Button
            variant="light"
            color="blue"
            radius="md"
            onClick={toggleNewComment}
          >
            New comment
          </Button>
        </Group>
      </Group>
      <Collapse in={commentsOpened}>
        <Text weight={500} mt="md">Comments</Text>
        {comments.map((comment) => <Comment key={crypto.randomUUID()} comment={comment} />)}
      </Collapse>
      <Collapse in={newCommentOpened}>
        <NewCommentForm postCommentCallback={newCommentCallback} />
      </Collapse>
    </Card>
  );
}

export default Post;
