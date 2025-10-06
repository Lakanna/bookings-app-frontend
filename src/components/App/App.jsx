import { Layout } from "../Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { selectIsRefreching } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { Toaster } from "react-hot-toast";
// import BookingsPage from "../../pages/BookingsPage.jsx";

const HomePage = lazy(() => import("../../pages/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage"));
const BookingsPage = lazy(() => import("../../pages/BookingsPage.jsx"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreching);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Please, wait, loading info...</div>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              component={<RegistrationPage />}
              redirectTo={"/"}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo={"/"} />
          }
        />
        <Route
          path="/bookings"
          element={
            <PrivateRoute component={<BookingsPage />} redirectTo={"/login"} />
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
