import React from 'react';
import { Outlet, redirect } from 'react-router-dom';

import Header from '../components/Header';
import useCredentials from '../hooks/useCredentials';

function Layout() {
  // eslint-disable-next-line no-unused-vars
  const [areCredentialsValid, ...rest] = useCredentials();

  if (!areCredentialsValid) { redirect('./'); }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
