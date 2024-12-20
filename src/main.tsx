import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Contact from "./pages/Contact/Contact";
import Forum from "./pages/Forum/Forum";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/forum",
        element: <Forum />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/forum",
        element: <Forum />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
