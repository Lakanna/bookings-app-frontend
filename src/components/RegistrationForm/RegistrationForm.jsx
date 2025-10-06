import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(7, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
});

export const RegistrationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "client",
    phone: "",
    description: "",
  };
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const roleId = useId();
  const businessId = useId();
  const phoneId = useId();
  const descriptionId = useId();

  const handleRegister = (values, actions) => {
    console.log(values, "values register");
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleRegister}
      validationSchema={FeedbackSchema}
    >
      {({ values }) => (
        <Form className={css.form}>
          <label htmlFor={nameFieldId} className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            autoComplete="off"
            className={css.input}
          />
          <ErrorMessage className={css.errorText} name="name" component="p" />

          <label htmlFor={emailFieldId} className={css.label}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            id={emailFieldId}
            autoComplete="off"
            className={css.input}
          />
          <ErrorMessage className={css.errorText} name="email" component="p" />

          <label htmlFor={passwordFieldId} className={css.label}>
            Password
          </label>
          <Field
            type="password"
            name="password"
            id={passwordFieldId}
            className={css.input}
            placeholder="Min 7 characters"
          />
          <ErrorMessage
            className={css.errorText}
            name="password"
            component="p"
          />

          <label htmlFor={roleId} className={css.label}>
            Client
          </label>
          <Field
            type="radio"
            name="role"
            value="client"
            className={css.input}
            id={roleId}
          />

          <label htmlFor={businessId} className={css.label}>
            Business
          </label>
          <Field
            type="radio"
            name="role"
            value="business"
            className={css.input}
            id={businessId}
          />

          {values.role === "business" && (
            <div className={css.businessFields}>
              <label htmlFor={phoneId} className={css.label}>
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                id={phoneId}
                className={css.input}
              />

              <label htmlFor={descriptionId} className={css.label}>
                Description
              </label>
              <Field
                type="text"
                name="description"
                id={descriptionId}
                className={css.input}
              />
            </div>
          )}

          <button type="submit" className={css.submitButton}>
            Registration
          </button>
        </Form>
      )}
    </Formik>
  );
};
