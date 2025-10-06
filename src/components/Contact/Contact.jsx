import css from "./Contact.module.css";
// import { MdPhone } from "react-icons/md";
// import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";

export default function Contact({ contact }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteContactModal, setdeleteContactModal] = useState(false);
  const [editContactModal, seteditContactModal] = useState(false);
  const { name, number } = contact;

  function openModal(param) {
    if (param === "deleteBtn") {
      setdeleteContactModal(true);
    } else {
      seteditContactModal(true);
    }
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setdeleteContactModal(false);
    seteditContactModal(false);
  }

  return (
    <div className={css.contactBox}>
      <div>
        <div className={css.nameBox}>
          {/* <IoPerson style={{ width: 20, height: 20 }} /> */}
          <p>{name}</p>
        </div>
        <div className={css.contactData}>
          {/* <MdPhone style={{ width: 20, height: 20 }} /> */}
          <a href={"tel: $ {number}"}>{number}</a>
          {/* <p>{number}</p> */}
        </div>
      </div>

      <button
        type="button"
        className={css.btnDelete}
        onClick={() => openModal("deleteBtn")}
      >
        Delete
      </button>
      <button className={css.btnEdit} type="button" onClick={() => openModal()}>
        Edit contact
      </button>

      {modalIsOpen === true && (
        <ModalWindow
          onCloseModal={closeModal}
          modalIsOpen={modalIsOpen}
          contact={contact}
          deleteContactModal={deleteContactModal}
          editContactModal={editContactModal}
        />
      )}
    </div>
  );
}
