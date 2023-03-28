import {
  TextInput, Button, Grid, Col,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'tabler-icons-react';

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const form = useForm({
    initialValues: {
      search: '',
    },
  });

  const submitHandler = ({ search }) => {
    const normalizedSearch = search.trim().toLowerCase();
    if (normalizedSearch === '') {
      setSearchParams({});
      return;
    }
    setSearchParams({ search: normalizedSearch });
    form.reset();
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
