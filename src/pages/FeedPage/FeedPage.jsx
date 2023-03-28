import { Stack } from '@mantine/core';
import React from 'react';
import Post from '../../components/Post';

function FeedPage() {
  return (
    <Stack mt="lg">
      <Post newCommentCallback={(text) => console.log(text)} />
    </Stack>
  );
}

export default FeedPage;
