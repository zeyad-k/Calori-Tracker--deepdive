import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DetailPage,
  ErrorPage,
  LandingPage,
  PageLayout,
  TrackPage,
} from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    // path: "/main",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // path: "",
        index: true,
        element: <LandingPage />,
      },
      { path: "track", element: <TrackPage /> },
      { path: "track/:recordId", element: <DetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
