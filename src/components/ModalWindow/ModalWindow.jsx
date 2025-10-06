import Modal from "react-modal";
// import css from "./ModalWindow.module.css";

import { BookingForm } from "../BookingForm/BookingForm.jsx";

// Modal.setAppElement("#root");

export default function ModalWindow({ onCloseModal, modalIsOpen, business }) {
  return (
    <>
      <BookingForm
        business={business}
        onCloseModal={onCloseModal}
        isOpen={modalIsOpen}
      />
    </>
  );
}
