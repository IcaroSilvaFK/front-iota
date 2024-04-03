import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
]);
