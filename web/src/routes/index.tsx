import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/Main';
import { Home } from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ],
  },
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  );
}
