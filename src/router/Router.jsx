import React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';

import IndexPage from '../pages/IndexPage';
import Layout from '../layout';
import FeedPage from '../pages/FeedPage';
import PostPage from '../pages/PostPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<IndexPage />} />
    <Route element={<Layout />}>
      <Route path="/feed/:search?" element={<FeedPage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </>,
), { basename: 'https://dariomrk.github.io/Internship-17-Social-Media-Feed' });

function Router() {
  return (<RouterProvider router={router} />);
}

export default Router;
