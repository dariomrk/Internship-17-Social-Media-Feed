import {
  TextInput, Button, Grid, Col,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'tabler-icons-react';

function Header() {
  const [showClearButton, setShowClearButton] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      search: '',
    },
    transformValues: (values) => ({
      search: values.search.trim().toLowerCase(),
    }),
  });

  const submitHandler = ({ search }) => {
    if (search === '') {
      navigate('/feed');
      return;
    }
    navigate(`/feed/?search=${search}`);
  };

  useEffect(() => {
    setShowClearButton(form.values.search.trim().toLowerCase() === searchParams.get('search'));
  }, [form, searchParams]);

  return (
    <header>
      <form onSubmit={form.onSubmit(submitHandler)}>
        <Grid align="center">
          <Col span="auto">
            <TextInput
              icon={<Search />}
              placeholder="Search users, posts..."
              variant="filled"
              {...form.getInputProps('search')}
            />
          </Col>
          <Col span="content">
            {(showClearButton
              ? (
                <Button
                  variant="light"
                  color="red"
                  onClick={() => {
                    navigate('/feed');
                    form.reset();
                  }}
                >
                  Clear
                </Button>
              )
              : (
                <Button
                  type="submit"
                  variant="light"
                >
                  Search
                </Button>
              )
              )}
          </Col>
        </Grid>
      </form>
    </header>
  );
}

export default Header;
