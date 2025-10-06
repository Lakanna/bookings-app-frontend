import { BusinessCard } from "../BusinessCard/BusinessCard.jsx";
import css from "./BusinessList.module.css";

export const BusinessList = ({ businesses }) => {
  return (
    <ul className={css.list}>
      {businesses.map((b) => (
        <li key={b._id}>
          <BusinessCard business={b} />
        </li>
      ))}
    </ul>
  );
};
