import {
  Card, Image, Text, Badge, Button, Group, Collapse,
} from '@mantine/core';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import Comment from '../Comment';
import NewCommentForm from '../NewCommentForm';

/**
 * @param {{
 * image: string,
 * text: string,
 * createdBy: string,
 * timestamp: string,
 * comments: {
 *  text: string,
 *  createdBy: string,
 *  timestamp: string,
 * }[],
 * newCommentCallback: (text: string) => void
 * }} props
 * @returns {JSX.ELement}
 */
function Post({
  image,
  text,
  createdBy,
  timestamp,
  comments = [],
  newCommentCallback,
}) {
  const [commentsOpened, { toggle: toggleComments }] = useDisclosure(false);
  const [newCommentOpened, { toggle: toggleNewComment }] = useDisclosure(false);
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={image ?? 'https://source.unsplash.com/l-lgKl4HNHM'}
          height={(!image ? 400 : 'fit-content')}
          alt="Post image"
        />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{createdBy ?? 'Anonymous'}</Text>
        <Group>
          <Badge>
            {comments.length}
            {' '}
            {comments.length === 1 ? 'comment' : 'comments'}
          </Badge>
          <Badge>{(!timestamp ? new Date() : Date.parse(timestamp)).toLocaleString('en-US')}</Badge>
        </Group>
      </Group>
      <Text size="sm" color="dimmed">
        {text ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
      </Text>
      <Group position="right" mt="md">
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
      <Collapse in={commentsOpened}>
        {comments.map((comment) => <Comment comment={comment} />)}
      </Collapse>
      <Collapse in={newCommentOpened}>
        <NewCommentForm postCommentCallback={newCommentCallback} />
      </Collapse>
    </Card>
  );
}

export default Post;
