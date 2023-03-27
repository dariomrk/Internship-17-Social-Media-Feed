import { Container } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

function Layout() {
  return (
    <Container p="sm">
      <Header />
      <main>
        <Outlet />
      </main>
    </Container>
  );
}

export default Layout;
