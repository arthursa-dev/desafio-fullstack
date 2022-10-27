import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/Main';
import { Home } from '../pages/Home';
import { ListProfessionals } from '../pages/ListProfessionals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/professionals',
        element: <ListProfessionals />
      }
    ],
  },
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  );
}
