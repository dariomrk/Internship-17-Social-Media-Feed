import {
  Button, Grid, Col, Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

/**
 * @param {{postCommentCallback: (text: string) => void}} props
 * @returns {JSX.Element}
 */
function NewCommentForm({ postCommentCallback }) {
  const form = useForm({
    initialValues: {
      comment: '',
    },
    validate: {
      comment: (comment) => (comment.trim() === ''
        ? 'Comment cannot be empty'
        : null),
    },
  });
  return (
    <form onSubmit={form.onSubmit((({ comment }) => {
      postCommentCallback(comment);
      form.reset();
    }))}
    >
      <Grid columns={10} align="start" mt="sm">
        <Col span="auto">
          <Textarea
            placeholder="Your shiny new comment goes here"
            variant="filled"
            {...form.getInputProps('comment')}
          />
        </Col>
        <Col span="content">
          <Button type="submit" variant="filled" size="sm">Post</Button>
        </Col>
      </Grid>
    </form>
  );
}

export default NewCommentForm;
