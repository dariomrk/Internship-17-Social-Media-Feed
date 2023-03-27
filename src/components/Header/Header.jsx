import {
  TextInput, Button, Grid, Col,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { Search } from 'tabler-icons-react';

function Header() {
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  const submitHandler = ({ search }) => {
    console.log(search); // TODO implement search
  };

  return (
    <header>
      <form onSubmit={form.onSubmit(submitHandler)}>
        <Grid columns={10} align="center">
          <Col span="auto">
            <TextInput
              icon={<Search />}
              placeholder="Search users, posts..."
              variant="filled"
              {...form.getInputProps('search')}
            />
          </Col>
          <Col span="content">
            <Button type="submit" variant="light" size="sm">Search</Button>
          </Col>
        </Grid>
      </form>
    </header>
  );
}

export default Header;
