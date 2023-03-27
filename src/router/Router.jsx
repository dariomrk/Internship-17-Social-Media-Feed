import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';

import IndexPage from '../pages/IndexPage';
import Layout from '../layout';
import FeedPage from '../pages/FeedPage';
import PostPage from '../pages/PostPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} />
      <Route element={<Layout />}>
        <Route path="/feed/:query?" element={<FeedPage />} />
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
