import { DocumentTitle } from "../components/DocumentTitle";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";

const styles = {
  container: {
    minHeight: "calc(100vh - 50px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

export default function RegistrationPage() {
  return (
    <>
      <DocumentTitle>Registration</DocumentTitle>

      <div style={styles.container}>
        <RegistrationForm />
      </div>
    </>
  );
}
