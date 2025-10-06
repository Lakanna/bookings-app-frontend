import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/auth/operations";
import css from "./EditProfileModal.module.css";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  role: Yup.string()
    .oneOf(["business", "client"], "Role must be either 'business' or 'client'")
    .required("Role is required"),
  phone: Yup.string(),
  description: Yup.string(),
});

export const EditProfileModal = ({ onClose, user }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values, "values");
    dispatch(updateUser(values));
    actions.setSubmitting(false);
    onClose();
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <Formik
          initialValues={{
            name: user.name || "",
            role: user.role || "",
            phone: user.phone || "",
            description: user.description || "",
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <label>Name</label>
            <Field type="text" name="name" className={css.input} />
            <ErrorMessage name="name" component="p" className={css.error} />

            <label>Phone</label>
            <Field type="text" name="phone" className={css.input} />

            <label>Select role</label>
            <Field as="select" name="role" className={css.input}>
              <option value="client">Client</option>
              <option value="business">Business</option>
            </Field>
            <ErrorMessage name="role" component="p" className={css.errorText} />

            <label>Description</label>
            <Field type="text" name="description" className={css.input} />

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className={css.cancelButton}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
