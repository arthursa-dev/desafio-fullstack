import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/Main';
import { AddProfessionals } from '../pages/AddProfessional';
import { AddProfessionalType } from '../pages/AddProfessionalType';
import { Home } from '../pages/Home';
import { ListProfessionals } from '../pages/ListProfessionals';
import { ListProfessionalsType } from '../pages/ListProfessionalsType';

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
      },
      {
        path: '/professionals-type',
        element: <ListProfessionalsType />
      },
      {
        path: '/add-professional-type',
        element: <AddProfessionalType />
      }
    ],
  },
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  );
}
