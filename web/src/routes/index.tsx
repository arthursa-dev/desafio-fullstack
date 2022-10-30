import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/Main';
import { AddProfessionals } from '../pages/AddProfessional';
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
      },
      {
        path: '/add-professional',
        element: <AddProfessionals />
      }
    ],
  },
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  );
}
