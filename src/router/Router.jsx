import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import Layout from '../layout';
import FeedPage from '../pages/FeedPage';
import PostPage from '../pages/PostPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post:id" element={<PostPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);

function Router() {
  return (<RouterProvider router={router} />);
}

export default Router;
