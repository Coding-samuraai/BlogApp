import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout, UnverifiedRoute } from "./components/index.js";
import AddPost from "./pages/AddPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import EditPost from "./pages/EditPost.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Post from "./pages/Post.jsx";
import Signup from "./pages/Signup.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import Verify from "./pages/Verify.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/",
        element: (
          <AuthLayout>
            <Home />,
          </AuthLayout>
        ),
      },
      {
        path: "/email-verification",
        element: (
          <UnverifiedRoute>
            <EmailVerification />,
          </UnverifiedRoute>
        ),
      },
      {
        path: "/verify",
        element: (
          <UnverifiedRoute>
            <Verify />
          </UnverifiedRoute>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/my-posts",
        element: (
          <AuthLayout>
            <MyPosts />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
