import { useDispatch } from "react-redux";
import css from "./BookingsCard.module.css";
import { deleteBooking } from "../../redux/bookings/operations.js";
import { useState } from "react";
import { BookingEditForm } from "../BookingEditForm/BookingEditForm.jsx";

export const BookingsCard = ({ booking, business }) => {
  const { _id, startAt, endAt, notes } = booking;
  const dispatch = useDispatch();

  const [editModalOpen, setEditModalOpen] = useState(false);

  const formattedStart = new Date(startAt).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedEnd = new Date(endAt).toLocaleTimeString([], {
    timeStyle: "short",
  });

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteBooking(id));
  };

  return (
    <div className={css.card}>
      <div className={css.header}>
        <h3 className={css.businessName}>
          {business?.name || "Unknown Business"}
        </h3>
        <p>{business?.description}</p>
        <p>{business?.phone}</p>
      </div>

      <p className={css.date}>
        <strong>Date:</strong> {formattedStart} – {formattedEnd}
      </p>

      {notes && (
        <p className={css.notes}>
          <strong>Notes:</strong> {notes}
        </p>
      )}

      <div className={css.actions}>
        <button className={css.editBtn} onClick={handleEdit}>
          Edit
        </button>
        <button className={css.deleteBtn} onClick={() => handleDelete(_id)}>
          Delete
        </button>
      </div>

      {editModalOpen && (
        <BookingEditForm
          booking={booking}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};
