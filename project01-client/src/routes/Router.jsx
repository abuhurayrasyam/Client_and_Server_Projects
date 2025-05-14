import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import UsersDetails from "../components/UsersDetails";
import UpdateUser from "../components/UpdateUser";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
        {
            index: true,
            Component: App
        },
        {
            path: '/users/:id',
            loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
            Component: UsersDetails
        },
        {
            path: '/update/:id',
            loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
            Component: UpdateUser
        }
    ]
  },
]);