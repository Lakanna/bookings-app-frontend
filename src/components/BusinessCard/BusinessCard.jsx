import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { useState } from "react";

import { BookingForm } from "../BookingForm/BookingForm.jsx";
import { Button } from "@mui/material";
import css from "./BusinessCard.module.css";

export const BusinessCard = ({ business }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBookClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={css.cardContainer}>
      <h3>{business.name}</h3>
      <p>{business.description}</p>
      <p>{business.phone}</p>
      <Button variant="contained" onClick={handleBookClick}>
        Booking
      </Button>

      {modalIsOpen && (
        <BookingForm
          business={business}
          onCloseModal={closeModal}
          isOpen={modalIsOpen}
        />
      )}
    </div>
  );
};
