import { useDispatch } from "react-redux";
import css from "./DeleteContactWindow.module.css";
import { deleteContact } from "../../redux/contacts/operations";

export default function DeleteContactWindow({ onCloseModal, contact }) {
  const dispatch = useDispatch();

  const handleDelete = (contact) => {
    dispatch(deleteContact(contact.id));
    onCloseModal();
  };

  const handleCancel = () => {
    onCloseModal();
  };

  return (
    <>
      <div className={css.describe}>
        <p>Do you really want to delete ${contact.name} contact?</p>
      </div>
      <div className={css.buttotsContainer}>
        <button
          type="button"
          className={css.button}
          onClick={() => handleDelete(contact)}
        >
          Delete contact
        </button>
        <button
          type="button"
          className={css.buttonReturn}
          onClick={handleCancel}
        >
          Cansel and return
        </button>
      </div>
    </>
  );
}
