import { DocumentTitle } from "../components/DocumentTitle";
import { LoginForm } from "../components/LoginForm/LoginForm";

const styles = {
  container: {
    minHeight: "calc(100vh - 50px)",
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
  },
};

export default function LoginPage() {
  return (
    <>
      <DocumentTitle>Login</DocumentTitle>

      <div style={styles.container}>
        <LoginForm />
      </div>
    </>
  );
}
