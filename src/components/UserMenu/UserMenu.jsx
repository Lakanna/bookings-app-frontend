import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";
import { useState } from "react";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal.jsx";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!user) return "";

  return (
    <div className={css.wrapper}>
      <p>
        Welcome, <span className={css.username}>{user.name}</span>
      </p>

      <div className={css.buttons}>
        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </button>

        <button
          type="button"
          className={css.button}
          onClick={() => dispatch(logOut())}
        >
          Log Out
        </button>
      </div>

      {isModalOpen && (
        <EditProfileModal onClose={() => setIsModalOpen(false)} user={user} />
      )}
    </div>
  );
};
