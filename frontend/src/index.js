import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/error-page.jsx';
import ListPage from './pages/list-page.jsx';
import MainPage from './pages/main-page.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/lists/:listName",
        element: <ListPage />,
      }
    ]
  },

])

root.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={'dark'} />
    <RouterProvider router={router} />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
