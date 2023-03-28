import {
  Button, Grid, Col, Textarea, FileInput, Card, Image, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { Upload } from 'tabler-icons-react';
import encode from '../../lib/encodeBase64';

function NewPostForm({ newPostCallback }) {
  const [imageFile, setImageFile] = useState(null);

  const form = useForm({
    initialValues: {
      text: '',
      image: null,
    },
    validate: {
      text: (text) => (text.trim() === '' ? 'Post text cannot be empty' : null),
    },
  });

  useEffect(() => {
    if (!imageFile) { return; }
    encode(imageFile)
      .then((encoded) => form.setFieldValue('image', encoded));
  }, [imageFile, form]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>New post</Title>
      {!form.values.image ? undefined : <Image mt="md" src={form.values.image} />}
      <form onSubmit={form.onSubmit(({ text, image }) => {
        newPostCallback({ text, image });
        form.reset();
      })}
      >
        <Textarea
          placeholder="Post text goes here"
          variant="filled"
          mt="md"
          {...form.getInputProps('text')}
        />
        <Grid columns={10} mt="sm">
          <Col span="auto">
            <FileInput
              icon={<Upload />}
              placeholder="Pick the image of your choice"
              accept="image/png,image/jpeg"
              formTarget="image"
              onChange={setImageFile}
            />

          </Col>
          <Col span="content">
            <Button type="submit" variant="filled" size="sm">Create</Button>
          </Col>
        </Grid>
      </form>
    </Card>
  );
}

export default NewPostForm;
