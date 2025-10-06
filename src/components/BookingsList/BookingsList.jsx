import { useSelector } from "react-redux";
import css from "./BookingsList.module.css";
import { selectBookings } from "../../redux/bookings/selectors.js";
import { BookingsCard } from "../BookingsCard/BookingsCard.jsx";
import { selectBusinesses } from "../../redux/businesses/selectors.js";

export const BookingsList = (handleDelete) => {
  const bookings = useSelector(selectBookings);
  const businesses = useSelector(selectBusinesses);

  if (!bookings || bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <ul className={css.list}>
      {bookings.map((booking) => {
        const business = businesses.find((b) => b._id === booking.businessId);

        return (
          <li key={booking._id}>
            <BookingsCard
              booking={booking}
              business={business}
              handleDelete={handleDelete}
            />
          </li>
        );
      })}
    </ul>
  );
};
