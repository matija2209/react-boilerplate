import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Error from "./pages/ErrorPage";
import Layout from "./components/layout/Layout";
import UploadPage from "./pages/PageTwo";
import RecordingDetails from "./pages/PageOne";
import { PrivateRoutes } from "./pages/PrivateRoute";
import { FirebaseAuthProvider } from "./contexts/AuthContext";

const routes = [
  {
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Layout>
            <App></App>
          </Layout>
        ),
      },
      {
        path: "/upload",
        element: (
          <Layout>
            <UploadPage></UploadPage>
          </Layout>
        ),
      },
      {
        path: "/recordings/:id",
        element: (
          <Layout>
            <RecordingDetails />
          </Layout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "*",
    element: <Error></Error>,
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <FirebaseAuthProvider>
        <RouterProvider router={router} />
        <CssBaseline />
      </FirebaseAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
