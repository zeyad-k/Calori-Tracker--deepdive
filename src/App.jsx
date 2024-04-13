import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage, PageLayout, TrackPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/track", element: <TrackPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
