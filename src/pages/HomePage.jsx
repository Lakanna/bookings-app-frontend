import { useEffect } from "react";
import { DocumentTitle } from "../components/DocumentTitle";

import { BusinessCard } from "../components/BusinessCard/BusinessCard.jsx";
import { BusinessList } from "../components/BusinessList/BusinessList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "../redux/businesses/operations.js";
import { selectBusinesses } from "../redux/businesses/selectors.js";

const styles = {
  container: {
    // minHeight: "calc(100vh - 50px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    textAlign: "center",
  },
  text: {
    margin: "16px",
  },
};

export default function HomePage() {
  const dispatch = useDispatch();
  const businesses = useSelector(selectBusinesses);

  useEffect(() => {
    dispatch(fetchBusinesses());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div style={styles.container}>
        <h2 style={styles.title}>Booking welcome page</h2>
        <p style={styles.text}>
          Welcome to the Booking App! Here you can easily book appointments with
          local businesses. To start booking, please create an account or log
          in.
        </p>
      </div>

      <div>
        <h2>Available Businesses</h2>
        <BusinessList businesses={businesses} />
      </div>
    </>
  );
}
