import { useDispatch } from "react-redux";
import { DocumentTitle } from "../components/DocumentTitle";
// import { selectError, selectLoading } from "../redux/bookings/selectors.js";
import { useEffect } from "react";

import { getAllBookings } from "../redux/bookings/operations.js";
import { BookingsList } from "../components/BookingsList/BookingsList.jsx";

export default function BookingsPage() {
  const dispatch = useDispatch();

  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your bookings</DocumentTitle>

      <h2>Bookings</h2>
      <BookingsList />

      {/* {loading && !error && <p>Loading contacts...</p>} */}
    </>
  );
}
